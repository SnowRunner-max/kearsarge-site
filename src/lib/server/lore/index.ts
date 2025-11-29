import { db } from '$lib/server/db';
import type { CharacterPageData, HistorySection, TimelineEntry, LogEntry } from '$lib/types/character';

export async function getCharacter(id: string): Promise<CharacterPageData | null> {
    const { data: charData, error: charError } = await db
        .from('characters')
        .select('*')
        .eq('id', id)
        .single();

    if (charError || !charData) {
        console.error(`Error fetching character ${id}: `, charError);
        return null;
    }

    const { data: historyData } = await db
        .from('character_history')
        .select('*')
        .eq('character_id', id)
        .order('order', { ascending: true });

    const { data: timelineData } = await db
        .from('character_timeline')
        .select('*')
        .eq('character_id', id)
        .order('order', { ascending: true });

    const { data: logsData } = await db
        .from('character_logs')
        .select('*')
        .eq('character_id', id)
        .order('log_id', { ascending: true });

    const history: HistorySection[] = (historyData || []).map((h) => ({
        title: h.title,
        body: h.body
    }));

    const timeline: TimelineEntry[] = (timelineData || []).map((t) => ({
        title: t.title,
        body: t.body
    }));

    const logs: LogEntry[] = (logsData || []).map((l) => ({
        id: l.log_id,
        title: l.title,
        filedBy: l.filed_by,
        date: l.date,
        body: l.body
    }));

    return {
        hero: {
            name: charData.name,
            tagline: charData.tagline
        },
        dossier: charData.dossier,
        history,
        timeline,
        logs
    };
}
