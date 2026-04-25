/**
 * Vercel Serverless Function for OpenRouter Chat API
 * @license Apache-2.0
 */

// Inline knowledge base to avoid file system issues
const knowledgeBase = {
  "company": {
    "name": "Continental Construction Services",
    "phone": "+63 912 345 6789",
    "email": "info@continental-glass.com",
    "serviceAreas": "Nationwide Coverage (Philippines)",
    "website": "https://continental-services.vercel.app"
  },
  "glassServices": {
    "available": true,
    "services": [
      { "name": "Glass Scratch Removal", "description": "Professional removal of minor to heavy scratches on all glass types", "costSavings": "25-50% vs. replacement" },
      { "name": "Residential Glass Restoration", "description": "Home windows, glass doors, partitions" },
      { "name": "Commercial Glass Restoration", "description": "Office buildings, storefronts, commercial properties" },
      { "name": "High-Rise Glass Service", "description": "Elevated and hard-to-reach glass surfaces" },
      { "name": "Construction Glass Repair", "description": "Tool damage, cement, welding burns, slurry" },
      { "name": "Graffiti Removal", "description": "Vandalism and graffiti removal from glass" },
      { "name": "Environmental Damage Repair", "description": "Acid rain, water stains, mineral deposits" }
    ]
  },
  "autoPartsInStock": {
    "windshield": [
      { "name": "Premium Windshield Glass", "features": "Laminated with UV protection", "available": true },
      { "name": "Side Window Glass", "features": "Tempered with tinting option", "available": true },
      { "name": "Rear Window Glass", "features": "With defroster option", "available": true }
    ],
    "engine": [
      { "name": "Engine Air Filter", "features": "OEM-grade for optimal performance", "available": true },
      { "name": "Performance Spark Plugs", "features": "Enhanced ignition", "available": true },
      { "name": "Oil Filter Premium", "features": "Engine protection", "available": true }
    ],
    "brakes": [
      { "name": "Ceramic Brake Pads", "features": "High-performance", "available": true }
    ],
    "lighting": [
      { "name": "LED Headlight Assembly", "features": "Complete assembly", "available": true },
      { "name": "Tail Light Set", "features": "OEM-quality replacement", "available": true }
    ],
    "electrical": [
      { "name": "12V Battery", "features": "High-capacity maintenance-free", "available": true },
      { "name": "Alternator", "features": "OEM replacement", "available": true }
    ],
    "accessories": [
      { "name": "Chrome Mirror Covers", "features": "Luxury vehicle styling", "available": true },
      { "name": "Windshield Wipers Set", "features": "Premium for clear visibility", "available": true }
    ]
  }
};

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
      console.error('Invalid messages:', messages);
      return res.status(400).json({ error: 'Invalid request: messages array required' });
    }

    // Check for API key with multiple possible env var names
    const apiKey = process.env.VITE_OPENROUTER_API_KEY || 
                   process.env.OPENROUTER_API_KEY ||
                   process.env.NEXT_PUBLIC_OPENROUTER_API_KEY;

    if (!apiKey) {
      console.error('API key not found. Available env vars:', Object.keys(process.env).filter(k => k.includes('OPEN')));
      return res.status(500).json({ error: 'API key not configured. Please add VITE_OPENROUTER_API_KEY to Vercel environment variables.' });
    }

    console.log('API key found, length:', apiKey.length);

    // Build dynamic system prompt from knowledge base
    const systemPrompt = buildSystemPrompt(knowledgeBase);

    console.log('Calling OpenRouter API...');

    const openRouterResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://continental-services.vercel.app',
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

    console.log('OpenRouter response status:', openRouterResponse.status);

    if (!openRouterResponse.ok) {
      const errorData = await openRouterResponse.json().catch(() => ({}));
      console.error('OpenRouter API error:', JSON.stringify(errorData));
      return res.status(500).json({ 
        error: 'OpenRouter API request failed',
        details: errorData.error?.message || 'Unknown error',
        status: openRouterResponse.status
      });
    }

    const data = await openRouterResponse.json();
    console.log('OpenRouter response received');

    const assistantMessage = data.choices?.[0]?.message?.content;

    if (!assistantMessage) {
      console.error('No message in response:', JSON.stringify(data));
      return res.status(500).json({ error: 'No response from AI' });
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

    console.log('Sending cleaned response');
    return res.status(200).json({ message: cleanedMessage });

  } catch (error) {
    console.error('Chat API error:', error.message);
    console.error('Error stack:', error.stack);
    return res.status(500).json({ 
      error: 'Failed to process chat request',
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
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
        if (word.length > 3) {
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
→ "Yes, free quotes! Fill out our form at /#contact or call ${kb.company.phone}"

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
Q: "Do you sell batteries?" → "Yes, we have 12V Battery. Check our Electrical section at /shop?category=electrical or call ${kb.company.phone}"
Q: "How can I get a quote?" → "Yes, free quotes! Fill out our form at /#contact or call ${kb.company.phone}"`;
}
