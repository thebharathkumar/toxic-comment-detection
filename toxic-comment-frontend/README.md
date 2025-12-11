# Toxic Comment Detection Frontend

A modern, AI-powered web application for detecting toxic comments using DistilBERT transformer model.

![Toxic Comment Detection](https://img.shields.io/badge/AI-Powered-blue)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)

## Features

- **Real-time Analysis**: Instant toxicity detection for text comments
- **Visual Feedback**: Clear probability scores and confidence indicators
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Example Comments**: Pre-loaded examples for quick testing
- **Ethical AI**: Built with responsible AI practices in mind

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI Model**: DistilBERT (via Hugging Face)
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- (Optional) Hugging Face API key for production use

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd toxic-comment-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables (Optional)**
   ```bash
   cp .env.example .env
   ```

   Edit `.env` and add your Hugging Face API key:
   ```
   HUGGINGFACE_API_KEY=your_api_key_here
   ```

   Get your API key from: https://huggingface.co/settings/tokens

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Deployment to Vercel

### Option 1: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Set environment variables** (if using Hugging Face API)
   ```bash
   vercel env add HUGGINGFACE_API_KEY
   ```

### Option 2: Deploy via Vercel Dashboard

1. Push your code to GitHub/GitLab/Bitbucket

2. Go to [vercel.com](https://vercel.com)

3. Click "New Project"

4. Import your repository

5. Add environment variables:
   - Key: `HUGGINGFACE_API_KEY`
   - Value: Your Hugging Face API key

6. Click "Deploy"

Your app will be live in minutes! 🚀

## How It Works

### Model Options

The application supports two modes:

1. **Production Mode** (with Hugging Face API Key)
   - Uses the `unitary/toxic-bert` model from Hugging Face
   - Provides accurate, state-of-the-art predictions
   - Requires API key (free tier available)

2. **Demo Mode** (no API key required)
   - Uses a simple keyword-based heuristic
   - Good for testing the UI and user experience
   - Not suitable for production use

### API Endpoint

- **POST** `/api/predict`
  - Request body: `{ "text": "your comment here" }`
  - Response:
    ```json
    {
      "prediction": "TOXIC" | "NON-TOXIC",
      "toxicProbability": 0.85,
      "nonToxicProbability": 0.15,
      "confidence": 0.85
    }
    ```

## Project Structure

```
toxic-comment-frontend/
├── app/
│   ├── api/
│   │   └── predict/
│   │       └── route.ts        # API endpoint for predictions
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Home page
├── components/
│   └── ToxicityDetector.tsx    # Main detection component
├── public/                      # Static assets
├── .env.example                # Environment variables template
├── next.config.js              # Next.js configuration
├── tailwind.config.ts          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies
```

## Model Information

This application is based on the toxic comment detection model trained on the Kaggle Jigsaw Toxic Comment Classification dataset:

- **Dataset**: 160k+ comments with toxicity labels
- **Architecture**: DistilBERT (66M parameters)
- **Performance**:
  - Accuracy: ~96.8%
  - F1 Score: ~83%
  - Precision: ~83%
  - Recall: ~83%

## Ethical Considerations

⚠️ **Important**: This tool should be used responsibly:

- **Not for automatic content removal** - Use as a flagging system only
- **Human review required** - Always include human oversight
- **Context matters** - The model may miss context, sarcasm, or cultural nuances
- **Bias awareness** - ML models can inherit biases from training data
- **False positives** - Some innocent comments may be flagged
- **False negatives** - Some toxic comments may be missed

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for learning and development.

## Acknowledgments

- Based on the DistilBERT model by Hugging Face
- Trained on Kaggle's Jigsaw Toxic Comment Classification dataset
- Built with Next.js and Vercel

## Support

If you encounter any issues or have questions:
1. Check the [Issues](../../issues) page
2. Create a new issue with details about your problem
3. Include error messages and screenshots if applicable

---

Built with ❤️ using AI and modern web technologies
