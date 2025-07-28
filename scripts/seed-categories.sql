-- Insert default categories
INSERT INTO categories (name, slug, description) VALUES
('Strategy', 'strategy', 'Strategic frameworks and business planning'),
('Growth', 'growth', 'Growth hacking and user acquisition tactics'),
('Leadership', 'leadership', 'Leadership principles and team management'),
('Tactics', 'tactics', 'Tactical execution and operational excellence'),
('Insights', 'insights', 'Market insights and competitive intelligence')
ON CONFLICT (name) DO NOTHING;
