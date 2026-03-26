const fs = require('fs');

function htmlToJsx(html) {
  let content = html;
  
  // extract body content safely
  const bodyStart = content.indexOf('<body');
  if (bodyStart !== -1) {
    const bodyStartTagEnd = content.indexOf('>', bodyStart);
    const bodyEnd = content.lastIndexOf('</body>');
    if (bodyStartTagEnd !== -1 && bodyEnd !== -1) {
      content = content.substring(bodyStartTagEnd + 1, bodyEnd);
    }
  }

  // Remove <nav> block
  const navStart = content.indexOf('<nav');
  if (navStart !== -1) {
    const navEnd = content.indexOf('</nav>');
    if (navEnd !== -1) {
      content = content.substring(0, navStart) + content.substring(navEnd + 6);
    }
  }

  // Simple string replacements
  content = content.replace(/class=\"/g, 'className="');
  content = content.replace(/for=\"/g, 'htmlFor="');
  content = content.replace(/tabindex=\"/g, 'tabIndex="');

  // Regex replacements (safer ones)
  content = content.replace(/style="([^"]*)"/g, (m, p) => {
    const obj = p.split(';').filter(s=>s.trim()).reduce((a,s) => {
      let parts = s.split(':');
      if(parts.length >= 2){
        let k = parts[0].trim();
        let v = parts.slice(1).join(':').trim();
        k = k.replace(/-([a-z])/g, g=>g[1].toUpperCase());
        a.push(`'${k}': '${v}'`);
      }
      return a;
    }, []);
    return `style={{${obj.join(',')}}}`;
  });
  
  content = content.replace(/<img([^>]*)>/g, (m, p) => p.endsWith('/') ? m : `<img${p} />`);
  content = content.replace(/<input([^>]*)>/g, (m, p) => p.endsWith('/') ? m : `<input${p} />`);
  content = content.replace(/<br>/g, '<br />');
  content = content.replace(/<hr>/g, '<hr />');
  
  // comments
  content = content.replace(/<!--(.*?)-->/gs, '{/*$1*/}');

  // Replace class= with className= (in case some were single quotes, but most are double)
  // Fix inline styles in SVGs or specific elements. We don't have SVGs here usually.
  
  return `<>\n${content.trim()}\n</>`;
}

const baseDir = 'C:/Users/kshah/.gemini/antigravity/brain/ad3749df-0730-4a0a-b6bf-0b7259c14c42/';
const outDir = 'c:/Users/kshah/Desktop/gulf chariity/frontend/src/pages/charities/';

if(!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, {recursive:true});
}

const files = [
  {in:'clean_water_alliance___detail_page.html', out:'CleanWaterAlliance.tsx', name:'CleanWaterAlliance'},
  {in:'global_scholars_fund___detail_page.html', out:'GlobalScholarsFund.tsx', name:'GlobalScholarsFund'},
  {in:'the_reforest_project___detail_page.html', out:'ReforestProject.tsx', name:'ReforestProject'},
  {in:'solar_impact_milestone___web_version.html', out:'SolarImpact.tsx', name:'SolarImpact'}
];

files.forEach(f => {
  const html = fs.readFileSync(baseDir + f.in, 'utf8');
  const jsx = htmlToJsx(html);
  
  const code = `import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ${f.name}() {
  const navigate = useNavigate();
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    ${jsx}
  );
}
`;
  fs.writeFileSync(outDir + f.out, code);
  console.log('Created ' + f.out);
});
