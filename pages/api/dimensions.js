// pages/api/dimensions.js

export default function handler(req, res) {
    if (req.method === 'POST') {
      const { pageHeight, pageWidth } = req.body;
      const aspectRatio = pageWidth / pageHeight;
  
      const maxWidth = 400;
      const maxHeight = 400;
  
      let displayWidth, displayHeight;
  
      if (aspectRatio > 1) {
        displayWidth = maxWidth;
        displayHeight = maxWidth / aspectRatio;
      } else {
        displayHeight = maxHeight;
        displayWidth = maxHeight * aspectRatio;
      }
  
      const hFactor = displayHeight / pageHeight;
      const wFactor = displayWidth / pageWidth;
  
      res.status(200).json({
        aspectRatio,
        displayWidth,
        displayHeight,
        hFactor,
        wFactor,
      });
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  }
  