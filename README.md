# SGWI Research Explorer Webapp

A modern, interactive scientific web application visualizing the research paper: **"Development of a multi-model framework for standardized groundwater index computation"** (Published in *Groundwater for Sustainable Development*, 2025).

This app demonstrates the efficacy of the **Multi-Model SGWI** methodology applied to Andhra Pradesh and Telangana states. It features a custom "Distribution Fitting" simulation to gamify the paper's core scientific contribution.

## 🚀 Live Demo
**[https://bharathk113.github.io/sgwi-webapp/](https://bharathk113.github.io/sgwi-webapp/)**

## 🔬 Scientific Features

*   **Multi-Model Simulation:** An interactive module where users assume the role of a researcher fitting Gamma, Pearson, and Normal distributions to groundwater data.
*   **Visual Data Storytelling:** Sections dedicated to the Methodology (AICc, K-S Test) and Validation results.
*   **Results Gallery:** High-resolution visualizations of the correlation between SGWI, SRI, and GRACE-DSI.
*   **AI Research Assistant:** A "Chat with the Paper" feature (requires API Key).

## 🛠 Deployment to GitHub Pages

### 1. Prerequisite: Assets
Before deploying, you must populate the `public/images/` folder.
Please look at `public/images/assets_checklist.txt` for the list of 5 required PNG files (e.g., `fig1_study_area.png`). The app will display placeholders if these are missing.

### 2. Configure `package.json`
Open your `package.json` manually and add the `homepage` field at the top level:

```json
{
  "name": "sgwi-webapp",
  "version": "1.0.0",
  "homepage": "https://bharathk113.github.io/sgwi-webapp/",
  ...
}
```

### 3. Build & Deploy
Run the following commands in your terminal:

```bash
# 1. Install dependencies (if not already done)
npm install

# 2. Build the project (creates the 'dist' folder)
npm run build

# 3. Deploy the 'dist' folder to GitHub
npx gh-pages -d dist
```

## 🤖 Chat Feature & API Key

The app includes an AI Chat feature powered by Google Gemini.

*   **Security Warning:** Since this is a static client-side application, embedding your API key makes it public to anyone inspecting the code.
*   **To Enable:** If you accept this risk (e.g., for a demo), set your API key environment variable before building.
    ```bash
    # Linux/Mac
    export API_KEY="your_actual_api_key"
    npm run build
    
    # Windows (Cmd)
    set API_KEY="your_actual_api_key"
    npm run build
    ```
*   **If Disabled:** If you do not provide an API key, the Chat button will still appear, but sending a message will result in a friendly error: *"Error connecting to the AI research assistant..."*

## 📄 Paper Details
*   **Title:** Development of a multi-model framework for standardized groundwater index computation
*   **Authors:** Asha Farsana M, Bharath Kumar Reddy Kadapala, Satya Geetha Vimala Channa, Abdul Hakeem K, Chandrasekar K
*   **DOI:** [10.1016/j.gsd.2025.101523](https://doi.org/10.1016/j.gsd.2025.101523)

## 📄 License
MIT License.