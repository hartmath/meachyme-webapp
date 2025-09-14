-- Enable RLS on the direct_messages table
ALTER TABLE direct_messages ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Users can insert messages where they are the sender" ON direct_messages;
DROP POLICY IF EXISTS "Users can read messages where they are sender or recipient" ON direct_messages;
DROP POLICY IF EXISTS "Users can update their own messages" ON direct_messages;

-- Create policy to allow users to insert messages where they are the sender
CREATE POLICY "Users can insert messages where they are the sender"
ON direct_messages
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = sender_id);

-- Create policy to allow users to read messages where they are either sender or recipient
CREATE POLICY "Users can read messages where they are sender or recipient"
ON direct_messages
FOR SELECT
TO authenticated
USING (auth.uid() = sender_id OR auth.uid() = recipient_id);

-- Create policy to allow users to update their own messages
CREATE POLICY "Users can update their own messages"
ON direct_messages
FOR UPDATE
TO authenticated
USING (auth.uid() = sender_id); 