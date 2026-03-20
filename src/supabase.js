import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ikjhhxurjdsucpyncqgl.supabase.co";
const supabaseKey = "sb_publishable_iSURVZfXoerCb18aciUa_g_hlZOipPC";

export const supabase = createClient(supabaseUrl, supabaseKey);