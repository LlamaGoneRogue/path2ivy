import AsyncStorage from '@react-native-async-storage/async-storage';

export async function saveCache<T>(key: string, value: T) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify({ v: 1, t: Date.now(), d: value }));
  } catch {}
}

export async function loadCache<T>(key: string): Promise<T | undefined> {
  try {
    const raw = await AsyncStorage.getItem(key);
    if (!raw) return undefined;
    const parsed = JSON.parse(raw);
    return parsed?.d as T;
  } catch {
    return undefined;
  }
}
