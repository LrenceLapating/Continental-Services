/**
 * Vercel Serverless Function for OpenRouter Chat API
 * @license Apache-2.0
 */

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Invalid request: messages array required' });
    }

    // Fetch knowledge base from the deployed site
    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : 'https://continental-services.vercel.app';
    
    const kbResponse = await fetch(`${baseUrl}/chatbot-knowledge.json`);
    const knowledgeBase = await kbResponse.json();

    const apiKey = process.env.VITE_OPENROUTER_API_KEY || process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      console.error('OPENROUTER_API_KEY not configured');
      return res.status(500).json({ error: 'API key not configured' });
    }

    // Build dynamic system prompt from knowledge base
    const systemPrompt = buildSystemPrompt(knowledgeBase);

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': baseUrl,
        'X-Title': 'Continental Construction Services'
      },
      body: JSON.stringify({
        model: 'inclusionai/ling-2.6-flash:free',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages
        ],
        temperature: 0.3,
        max_tokens: 200
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('OpenRouter API error:', errorData);
      throw new Error(errorData.error?.message || 'OpenRouter API request failed');
    }

    const data = await response.json();
    const assistantMessage = data.choices[0]?.message?.content;

    if (!assistantMessage) {
      throw new Error('No response from AI');
    }

    // Clean thinking process
    let cleanedMessage = assistantMessage;
    
    // First, try to extract content between quotes if present
    const quoteMatch = cleanedMessage.match(/"([^"]+)"/);
    if (quoteMatch && quoteMatch[1].length > 30) {
      cleanedMessage = quoteMatch[1];
    } else {
      // Remove thinking process patterns
      const cleaningPatterns = [
        /Check word count.*?\.\s*/gi,
        /That covers.*?\.\s*/gi,
        /flows naturally.*?\.\s*/gi,
        /No markdown.*?\.\s*/gi,
        /thinking process.*?\.\s*/gi,
        /per guidelines.*?\.\s*/gi,
        /Okay, the user.*?\.\s*/gi,
        /Let me recall.*?\.\s*/gi,
        /I need to respond.*?\.\s*/gi,
        /Important:.*?\.\s*/gi,
        /Double-check.*?\.\s*/gi,
        /Draft:.*?\.\s*/gi,
        /Example response.*?\.\s*/gi,
        /includes the contact.*?\.\s*/gi,
        /as per guidelines.*?\.\s*/gi,
        /stay concise.*?\.\s*/gi,
        /key points.*?\.\s*/gi
      ];
      
      for (const pattern of cleaningPatterns) {
        cleanedMessage = cleanedMessage.replace(pattern, '');
      }
    }
    
    cleanedMessage = cleanedMessage.trim();

    return res.status(200).json({ message: cleanedMessage });

  } catch (error) {
    console.error('Chat API error:', error);
    return res.status(500).json({ 
      error: 'Failed to process chat request',
      message: error.message 
    });
  }
}

function buildSystemPrompt(kb) {
  // Build auto parts list dynamically with product-to-category mapping
  const categories = [];
  const productToCategory = {};
  const categoryLinks = {
    'windshield': 'windshield',
    'engine': 'engine',
    'brakes': 'brakes',
    'lighting': 'lights',
    'electrical': 'electrical',
    'accessories': 'accessories'
  };

  // Build product mapping and category lists
  for (const [category, items] of Object.entries(kb.autoPartsInStock)) {
    const itemNames = items.map(item => item.name).join(', ');
    const link = categoryLinks[category] || category;
    categories.push(`${category.toUpperCase()}: ${itemNames} → /shop?category=${link}`);
    
    // Map each product to its category
    items.forEach(item => {
      productToCategory[item.name.toLowerCase()] = link;
      // Also map common variations
      const words = item.name.toLowerCase().split(' ');
      words.forEach(word => {
        if (word.length > 3) { // Only meaningful words
          productToCategory[word] = link;
        }
      });
    });
  }

  const categoriesText = categories.join('\n');
  
  // Build product mapping text for AI
  const productMappingText = Object.entries(productToCategory)
    .map(([product, category]) => `${product} → /shop?category=${category}`)
    .join('\n');

  return `You are a helpful sales assistant for ${kb.company.name}.

COMPANY INFO:
- Services: ${kb.glassServices.services.map(s => s.name).join(', ')}
- Coverage: ${kb.company.serviceAreas}
- Contact: ${kb.company.phone}
- Shop: /shop

AUTO PARTS CATEGORIES:
${categoriesText}

PRODUCT TO CATEGORY MAPPING (use this to provide correct links):
${productMappingText}

RESPONSE STRATEGY:

When asked about ANY specific product:
1. Identify which category it belongs to from the mapping above
2. Provide the link: /shop?category=[correct-category]
3. Example: "brake pads" → /shop?category=brakes
4. Example: "headlights" → /shop?category=lights
5. Example: "battery" → /shop?category=electrical

When asked "What car parts?" or "List all parts":
→ List the categories and say "Browse all at /shop or call ${kb.company.phone}"

When asked about specific product:
→ "Yes, we have [product name]. Check our [Category] section at /shop?category=[category] or call ${kb.company.phone}"

When asked about service area:
→ "Yes, ${kb.company.serviceAreas}. Call ${kb.company.phone}"

When asked about quotes/pricing:
→ "Yes, free quotes! Call ${kb.company.phone}"

When asked about glass services:
→ Mention glass restoration, scratch removal, 25-50% savings. Call ${kb.company.phone}

For car parts NOT in our inventory:
→ "We don't stock [item] yet, but we're expanding. Call ${kb.company.phone}"

For off-topic questions:
→ "I help with glass restoration and auto parts. Call ${kb.company.phone}"

CRITICAL RULES:
- ALWAYS use the product mapping to provide the CORRECT category link
- If asked about "brake pads", link to /shop?category=brakes
- If asked about "spark plugs", link to /shop?category=engine
- If asked about "headlights", link to /shop?category=lights
- Be direct and answer the specific question
- Keep responses under 45 words
- No markdown, no thinking process

Examples:
Q: "Do you have brake pads?" → "Yes, we have Ceramic Brake Pads. Check our Brakes section at /shop?category=brakes or call ${kb.company.phone}"
Q: "What about spark plugs?" → "Yes, we have Performance Spark Plugs. Check our Engine section at /shop?category=engine or call ${kb.company.phone}"
Q: "Do you sell batteries?" → "Yes, we have 12V Battery. Check our Electrical section at /shop?category=electrical or call ${kb.company.phone}"`;
}
