# Deploy Your Trained DistilBERT Model to Hugging Face

## Option A: Hugging Face Hub (Recommended - FREE)

### Step 1: Save Your Model from Colab

Add this to your Colab notebook after training:

```python
# Save the trained model
model.save_pretrained("./toxic-comment-model")
tokenizer.save_pretrained("./toxic-comment-model")

# Zip it for download
!zip -r toxic-comment-model.zip toxic-comment-model/

# Download to your computer
from google.colab import files
files.download('toxic-comment-model.zip')
```

### Step 2: Create Hugging Face Account
1. Go to https://huggingface.co/join
2. Create a free account
3. Verify your email

### Step 3: Create Model Repository
1. Go to https://huggingface.co/new
2. Repository name: `toxic-comment-distilbert`
3. Set to Public
4. Click "Create model repository"

### Step 4: Upload Your Model
1. On your model repo page, click "Files and versions"
2. Click "Add file" → "Upload files"
3. Upload all files from the unzipped folder:
   - `config.json`
   - `pytorch_model.bin` (or `model.safetensors`)
   - `tokenizer_config.json`
   - `vocab.txt`
   - `tokenizer.json`
4. Commit changes

### Step 5: Get API Token
1. Go to https://huggingface.co/settings/tokens
2. Click "New token"
3. Name it: "Vercel App"
4. Role: "Read"
5. Click "Generate"
6. Copy the token

### Step 6: Update Frontend API

In your frontend, update the API route to use YOUR model:

File: `toxic-comment-frontend/app/api/predict/route.ts`

Change line 21 from:
```typescript
"https://api-inference.huggingface.co/models/unitary/toxic-bert"
```

To:
```typescript
"https://api-inference.huggingface.co/models/YOUR_USERNAME/toxic-comment-distilbert"
```

### Step 7: Add API Key to Vercel
1. Vercel Dashboard → Your Project
2. Settings → Environment Variables
3. Add:
   - Name: `HUGGINGFACE_API_KEY`
   - Value: (paste your token)
4. Redeploy

---

## Option B: Google Cloud Run (Your Notebook Mentions This)

### Step 1: Create API Server

```python
# Create app.py
from fastapi import FastAPI
from pydantic import BaseModel
import torch
from transformers import DistilBertTokenizer, DistilBertForSequenceClassification

app = FastAPI()

# Load model at startup
model = DistilBertForSequenceClassification.from_pretrained("./toxic-comment-model")
tokenizer = DistilBertTokenizer.from_pretrained("./toxic-comment-model")
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
model.to(device)

class CommentRequest(BaseModel):
    text: str

@app.post("/predict")
async def predict(request: CommentRequest):
    inputs = tokenizer(
        request.text,
        return_tensors='pt',
        truncation=True,
        max_length=256,
        padding='max_length'
    )
    inputs = {k: v.to(device) for k, v in inputs.items()}

    with torch.no_grad():
        outputs = model(**inputs)

    logits = outputs.logits
    probs = torch.softmax(logits, dim=1)[0]

    return {
        "prediction": "TOXIC" if probs[1] > 0.5 else "NON-TOXIC",
        "toxicProbability": float(probs[1]),
        "nonToxicProbability": float(probs[0]),
        "confidence": float(max(probs))
    }
```

### Step 2: Deploy to Cloud Run
```bash
# Create Dockerfile
# Build container
# Deploy to Cloud Run
# Update frontend API endpoint
```

---

## Option C: Use Free Colab/Gradio (Temporary Testing)

Your notebook already has Gradio! You can:
1. Run the Gradio cell in Colab
2. Get the public URL (like `https://xxxxx.gradio.live`)
3. Update your frontend to call that URL

**Note:** Gradio links expire after 72 hours

---

## 🎯 My Recommendation

**For now:**
1. Let's fix the Vercel deployment first (so you have a working frontend)
2. Then deploy your model to Hugging Face (it's free and easy)
3. Connect them together

**What do you prefer?**
- A) Fix Vercel deployment first, then connect model later
- B) Deploy model to Hugging Face now
- C) Use Gradio for quick testing
