import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { supabase } from './supabase';

import subscriptionsRouter from './routes/subscriptions';
import scoresRouter from './routes/scores';
import drawsRouter from './routes/draws';
import winnersRouter from './routes/winners';
import adminRouter from './routes/admin';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Root Entry
app.get('/', (req: Request, res: Response) => {
  res.send('Sovereign API Online. Use /api/health for system status.');
});

// Basic Health Check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ 
    status: 'Sovereign System Online', 
    timestamp: new Date().toISOString(),
    supabaseConnected: !!supabase
  });
});

// Modular Routes
app.use('/api/subscriptions', subscriptionsRouter);
app.use('/api/scores', scoresRouter);
app.use('/api/draws', drawsRouter);
app.use('/api/winners', winnersRouter);
app.use('/api/admin', adminRouter);

// Mock Charities endpoint (We keep this mock since charities are probably static or fetched from a DB that isn't fully seeded yet, but let's connect it to DB)
app.get('/api/charities', async (req: Request, res: Response) => {
  if (!supabase) return res.status(500).json({ error: 'Supabase inactive' });
  const { data, error } = await supabase.from('charities').select('*');
  
  if (error || !data || data.length === 0) {
    // Fallback to static if DB is empty for UI purposes
    return res.json([
      { 
        id: '1', 
        name: "Maya's New Horizon", 
        description: "Medical support for rural communities.", 
        total_raised: 12400,
        image_url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800"
      },
      { 
        id: '2', 
        name: "The Learning Arc", 
        description: "Providing digital literacy to the next generation.", 
        total_raised: 8900,
        image_url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800"
      },
      { 
        id: '3', 
        name: "Pure Stream Project", 
        description: "Clean water and sustainability initiatives.", 
        total_raised: 4500,
        image_url: "https://images.unsplash.com/photo-1538300342682-cf57afb97285?auto=format&fit=crop&q=80&w=800"
      }
    ]);
  }

  res.json(data);
});

app.listen(port, () => {
  console.log(`[BACKEND] Sovereign Server API running on http://localhost:${port}`);
});
