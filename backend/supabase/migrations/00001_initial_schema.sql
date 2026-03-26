-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- USERS TABLE
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    role TEXT CHECK (role IN ('user', 'admin')) DEFAULT 'user',
    name TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- SUBSCRIPTIONS TABLE
CREATE TABLE subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    type TEXT CHECK (type IN ('monthly', 'yearly')),
    status TEXT CHECK (status IN ('active', 'inactive')) DEFAULT 'inactive',
    renewal_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- SCORES TABLE
CREATE TABLE scores (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    value INTEGER CHECK (value >= 1 AND value <= 45),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- CHARITIES TABLE
CREATE TABLE charities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    total_raised NUMERIC DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- DRAWS TABLE (with is_published lock for atomic execution)
CREATE TABLE draws (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    draw_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    winning_numbers INTEGER[] CHECK (array_length(winning_numbers, 1) = 5),
    status TEXT CHECK (status IN ('pending', 'completed')) DEFAULT 'pending',
    type TEXT CHECK (type IN ('random', 'algorithm')) DEFAULT 'random',
    jackpot_rolled_over BOOLEAN DEFAULT FALSE,
    jackpot_rollover_amount NUMERIC DEFAULT 0,
    is_published BOOLEAN DEFAULT FALSE, -- Lock field
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- WINNERS TABLE
CREATE TABLE winners (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    draw_id UUID REFERENCES draws(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    match_count INTEGER CHECK (match_count IN (3, 4, 5)),
    prize_amount NUMERIC NOT NULL,
    proof_url TEXT,
    status TEXT CHECK (status IN ('pending', 'approved', 'rejected')) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- DONATIONS TABLE
CREATE TABLE donations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    charity_id UUID REFERENCES charities(id) ON DELETE SET NULL,
    percentage NUMERIC CHECK (percentage >= 10.0), -- Enforce minimum 10%
    amount NUMERIC,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- INDEXES
CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX idx_scores_user_id ON scores(user_id);
CREATE INDEX idx_scores_created_at ON scores(created_at DESC);
CREATE INDEX idx_winners_user_id ON winners(user_id);
CREATE INDEX idx_winners_draw_id ON winners(draw_id);
CREATE INDEX idx_donations_user_id ON donations(user_id);

-- FUNCTION: Atomic Draw Locking
-- Prevents a draw from being executed/modified if already published
CREATE OR REPLACE FUNCTION check_draw_lock() RETURNS TRIGGER AS $$
BEGIN
    IF OLD.is_published = TRUE THEN
        RAISE EXCEPTION 'Cannot modify a published draw. Action locked.';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER prevent_published_draw_update
BEFORE UPDATE ON draws
FOR EACH ROW
EXECUTE FUNCTION check_draw_lock();
