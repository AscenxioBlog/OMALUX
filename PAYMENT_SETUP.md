# SeerBit Payment Setup

## 1. Install & Login Supabase CLI
npm install -g supabase
supabase login

## 2. Link your project (run inside OMALUX folder)
supabase link --project-ref ikjhhxurjdsucpyncqgl

## 3. Set your SeerBit private key securely
supabase secrets set SEERBIT_PRIVATE_KEY=SBTESTPRIVK_your_private_key_here

## 4. Deploy the edge function
supabase functions deploy verify-payment

## 5. Replace in CheckoutPage.jsx
SEERBIT_PUBLIC_KEY = "SBTESTPUBK_your_actual_public_key"
