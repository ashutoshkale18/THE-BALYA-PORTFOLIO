import {
  initialProfile,
  initialBrands,
  initialProjects,
  initialSoftwares,
} from '../data/portfolio';
import type {
  Profile,
  BrandItem,
  ProjectItem,
  SoftwareItem
} from '../data/portfolio';


const API_BASE = (import.meta.env.VITE_API_URL || 'http://localhost:5050') + '/api';

export async function fetchProfile(): Promise<Profile> {
  try {
    const res = await fetch(`${API_BASE}/profile`, { signal: AbortSignal.timeout(1500) });
    if (res.ok) return await res.json();
  } catch (e) {
    // fallback gracefully
  }
  return initialProfile;
}

export async function fetchBrands(): Promise<BrandItem[]> {
  try {
    const res = await fetch(`${API_BASE}/brands`, { signal: AbortSignal.timeout(1500) });
    if (res.ok) return await res.json();
  } catch (e) {
    // fallback gracefully
  }
  return initialBrands;
}

export async function fetchProjects(featuredOnly = false): Promise<ProjectItem[]> {
  try {
    const url = featuredOnly ? `${API_BASE}/projects?featured=true` : `${API_BASE}/projects`;
    const res = await fetch(url, { signal: AbortSignal.timeout(1500) });
    if (res.ok) return await res.json();
  } catch (e) {
    // fallback gracefully
  }
  return featuredOnly ? initialProjects.filter(p => p.featured) : initialProjects;
}

export async function fetchSoftwares(): Promise<SoftwareItem[]> {
  try {
    const res = await fetch(`${API_BASE}/softwares`, { signal: AbortSignal.timeout(1500) });
    if (res.ok) return await res.json();
  } catch (e) {
    // fallback gracefully
  }
  return initialSoftwares;
}

export async function sendContactMessage(payload: { name: string; email: string; message: string }) {
  const res = await fetch(`${API_BASE}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  return res.json();
}
