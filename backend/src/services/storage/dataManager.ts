import { supabase } from '../supabase.js';

export async function updateUserStoragePreference(
  userId: string,
  dataStorageEnabled: boolean
): Promise<void> {
  const { error } = await supabase
    .from('users')
    .update({ data_storage_enabled: dataStorageEnabled })
    .eq('id', userId);

  if (error) {
    throw error;
  }
}

export async function deleteTemporaryData(userId: string): Promise<void> {
  const now = new Date().toISOString();

  // Delete expired temporary data
  const tables = ['cases', 'session_notes', 'ethics_checks', 'supervisor_reflections'];

  for (const table of tables) {
    await supabase
      .from(table)
      .delete()
      .eq('user_id', userId)
      .eq('is_temporary', true)
      .lt('expires_at', now);
  }
}

export async function deleteAllTemporaryData(): Promise<void> {
  // Background job to delete all expired temporary data
  const now = new Date().toISOString();
  const tables = ['cases', 'session_notes', 'ethics_checks', 'supervisor_reflections'];

  for (const table of tables) {
    await supabase
      .from(table)
      .delete()
      .eq('is_temporary', true)
      .lt('expires_at', now);
  }
}

export async function exportUserData(userId: string): Promise<any> {
  const { data: cases } = await supabase
    .from('cases')
    .select('*')
    .eq('user_id', userId)
    .eq('is_temporary', false);

  const { data: notes } = await supabase
    .from('session_notes')
    .select('*')
    .eq('user_id', userId)
    .eq('is_temporary', false);

  const { data: ethics } = await supabase
    .from('ethics_checks')
    .select('*')
    .eq('user_id', userId)
    .eq('is_temporary', false);

  const { data: reflections } = await supabase
    .from('supervisor_reflections')
    .select('*')
    .eq('user_id', userId)
    .eq('is_temporary', false);

  return {
    cases: cases || [],
    notes: notes || [],
    ethicsChecks: ethics || [],
    reflections: reflections || [],
    exportedAt: new Date().toISOString(),
  };
}

