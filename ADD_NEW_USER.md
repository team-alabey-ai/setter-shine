# How to Add a New User

Follow these steps to create a new user and connect them to their dashboard data.

## Prerequisites
- Access to Supabase Dashboard
- The client's `tenant_id` from your `metrics_daily` table
- User's email address

## Steps

### 1. Generate tenant_id (for new clients)
If this is a NEW client who doesn't have data yet:
- Generate a new UUID at https://www.uuidgenerator.net/
- Use this `tenant_id` in both n8n workflow and user creation
- Example: `a1b2c3d4-e5f6-7890-abcd-ef1234567890`

### 2. Create User in Supabase Auth
1. Go to **Supabase Dashboard** → **Authentication** → **Users**
2. Click **"Add user"** button
3. Fill in:
   - **Email**: `client@example.com`
   - **Password**: Create a temporary password (e.g., `TempPass123!`)
   - **Auto Confirm User**: ✅ Check this box
4. Click **"Create user"**

### 3. Connect User to tenant_id
1. Go to **SQL Editor** in Supabase Dashboard
2. Run this query:

```sql
UPDATE auth.users 
SET raw_user_meta_data = raw_user_meta_data || '{"tenant_id": "THEIR-TENANT-ID-HERE"}'::jsonb
WHERE email = 'newuser@example.com';
```

**Replace:**
- `THEIR-TENANT-ID-HERE` with the actual tenant_id (e.g., `7f3d9c2a-6b61-4f1a-9a7b-3f2d4c8e1b6a`)
- `newuser@example.com` with the user's actual email

**Example:**
```sql
UPDATE auth.users 
SET raw_user_meta_data = raw_user_meta_data || '{"tenant_id": "7f3d9c2a-6b61-4f1a-9a7b-3f2d4c8e1b6a"}'::jsonb
WHERE email = 'ralfsmlg@gmail.com';
```

3. Click **"Run"** to execute the query

### 4. Verify Connection
1. Go back to **Authentication** → **Users**
2. Click on the user you just created
3. Click **"Raw JSON"** tab
4. Look for `"raw_user_meta_data"` section - you should see:
```json
"raw_user_meta_data": {
  "full_name": "Client Name",
  "tenant_id": "7f3d9c2a-6b61-4f1a-9a7b-3f2d4c8e1b6a"
}
```

### 5. Configure n8n Workflow
1. Duplicate your n8n workflow template
2. Update the hardcoded `tenant_id` to match the one you used above
3. Test the workflow to ensure data flows to Supabase

### 6. Send Credentials to Client
Share with the client:
- **Dashboard URL**: `https://setter.lindenpartners.ai/login`
- **Email**: The email you created
- **Temporary Password**: The password you set
- **Instructions**: Ask them to change password after first login

## Troubleshooting

### User can't see any data
- Check if `tenant_id` is in their user metadata (Step 4)
- Verify data exists in `metrics_daily` table with their `tenant_id`
- Run this query to check:
```sql
SELECT * FROM metrics_daily WHERE tenant_id = 'THEIR-TENANT-ID-HERE';
```

### User sees error when logging in
- Verify user is confirmed (check "Confirmed at" field)
- Check if email/password are correct
- Verify user has `tenant_id` in metadata

## Quick Reference

### Check which tenant_ids exist in your data
```sql
SELECT DISTINCT tenant_id FROM metrics_daily;
```

### View user's metadata
```sql
SELECT email, raw_user_meta_data FROM auth.users WHERE email = 'user@example.com';
```

### Update existing user's tenant_id
```sql
UPDATE auth.users 
SET raw_user_meta_data = raw_user_meta_data || '{"tenant_id": "NEW-TENANT-ID"}'::jsonb
WHERE email = 'user@example.com';
```
