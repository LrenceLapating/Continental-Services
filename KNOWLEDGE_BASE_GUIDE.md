# Chatbot Knowledge Base Guide

## Overview
The chatbot uses `chatbot-knowledge.json` as its knowledge base. You can easily update this file to add new products, services, or information without touching any code.

## File Location
```
Continental-Services/chatbot-knowledge.json
```

## How to Update

### Adding New Auto Parts (In Stock)

1. Open `chatbot-knowledge.json`
2. Find the `autoPartsInStock` section
3. Add your new product to the appropriate category:

```json
"engine": [
  {
    "name": "Turbocharger",
    "features": "High-performance boost",
    "available": true
  }
]
```

**Available Categories:**
- `windshield` - Glass products
- `engine` - Engine components
- `brakes` - Brake systems
- `lighting` - Lights and bulbs
- `electrical` - Batteries, alternators, etc.
- `accessories` - Misc accessories

### Adding Coming Soon Products

Add items you plan to stock soon:

```json
"autoPartsComingSoon": {
  "note": "Add items here that you plan to stock in the future",
  "items": [
    "Performance exhaust systems",
    "Racing seats",
    "Turbo kits"
  ]
}
```

The AI will tell customers these are coming soon and to check back!

### Updating Products Not Carried

Update the list of categories you don't carry:

```json
"autoPartsNotCarried": {
  "categories": [
    "Tires and wheels",
    "Body panels and bumpers",
    "Your new category here"
  ]
}
```

### Adding New Glass Services

```json
"glassServices": {
  "services": [
    {
      "name": "Skylight Restoration",
      "description": "Residential and commercial skylight repair"
    }
  ]
}
```

### Updating Contact Information

```json
"company": {
  "name": "Continental Construction Services",
  "phone": "+63 912 345 6789",
  "email": "info@continental-glass.com",
  "serviceAreas": "Nationwide Coverage (Philippines)",
  "website": "https://continental-services.vercel.app"
}
```

### Adding Completed Projects

```json
"completedProjects": [
  "Your New Project Name (Location)"
]
```

## AI Response Behavior

The AI automatically adjusts responses based on the knowledge base:

### For Products In Stock
✅ "Yes, we carry [product]! [Features]. For pricing, call +63 912 345 6789."

### For Car Parts Not In Stock
✅ "We don't currently stock [item], but we're expanding our inventory. Call us at +63 912 345 6789 and we can discuss options or notify you when available."

### For Coming Soon Items
✅ "Great timing! We're adding [item] to our catalog soon. Call +63 912 345 6789 to get notified when it's available."

### For Off-Topic Questions
✅ "I'm here to help with glass restoration and auto parts. For other questions, call +63 912 345 6789."

## Best Practices

1. **Keep it Updated**: Update the knowledge base whenever you add/remove products
2. **Be Specific**: Include features and benefits for each product
3. **Use Clear Names**: Use product names customers would search for
4. **Test After Updates**: Ask the chatbot about new products to verify

## Example: Adding a New Product Category

Let's say you want to add "suspension" parts:

```json
"autoPartsInStock": {
  "suspension": [
    {
      "name": "Shock Absorbers",
      "features": "Heavy-duty gas-charged",
      "available": true
    },
    {
      "name": "Coil Springs",
      "features": "OEM replacement quality",
      "available": true
    }
  ]
}
```

That's it! The AI will now know about suspension parts and can answer customer questions.

## Deployment

After updating `chatbot-knowledge.json`:

1. **Local Testing**: Changes are immediate (just refresh)
2. **Production**: Commit and push to Git, Vercel will auto-deploy

```bash
git add chatbot-knowledge.json
git commit -m "Updated product catalog"
git push origin main
```

## Tips for Sales-Focused Responses

The AI is trained to:
- ✅ Keep customers engaged even for products you don't have
- ✅ Encourage them to call for more information
- ✅ Make them want to check back later
- ✅ Never make customers feel dismissed

This approach maximizes customer retention and future sales opportunities!

---

**Need Help?** Check `CHATBOT_SETUP.md` for technical details or contact support.
