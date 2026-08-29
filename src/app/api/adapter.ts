/// <reference types="vite/client" />
import {
    Candidate,
    Job,
    Application,
    RecruiterActivity,
    Message,
    CandidateMatch
} from '../data/types';
import {
    mockCandidates,
    mockJobs,
    mockApplications,
    mockRecruiterActivities,
    mockMessages,
    mockCandidateMatches
} from '../data/mockData';

// Simulated delay for mock responses
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const IS_MOCK = import.meta.env.VITE_API_MOCK_ENABLED !== 'false'; // Default to mock if not explicitly false

// Base API endpoints (would be configured in actual environment variables)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/v1';

export const api = {
    // Jobs
    getJobs: async (): Promise<Job[]> => {
        if (IS_MOCK) {
            await delay(500);
            return mockJobs;
        }
        const response = await fetch(`${API_BASE_URL}/jobs`);
        if (!response.ok) throw new Error('Failed to fetch jobs');
        return response.json();
    },

    getJobById: async (id: string): Promise<Job> => {
        if (IS_MOCK) {
            await delay(200);
            const normalizedId = id.replace(/^job-/, '');
            const job = mockJobs.find((j) => j.id === id || j.id === normalizedId);
            return job || mockJobs[0];
        }
        const response = await fetch(`${API_BASE_URL}/jobs/${id}`);
        if (!response.ok) throw new Error('Failed to fetch job');
        return response.json();
    },

    // Candidates
    getCandidates: async (): Promise<Candidate[]> => {
        if (IS_MOCK) {
            await delay(300);
            return mockCandidates;
        }
        const response = await fetch(`${API_BASE_URL}/candidates`);
        if (!response.ok) throw new Error('Failed to fetch candidates');
        return response.json();
    },

    getCandidateById: async (id: string): Promise<Candidate> => {
        if (IS_MOCK) {
            await delay(200);
            const normalizedId = id.replace(/^cand-/, '');
            const candidate = mockCandidates.find(
                (c) => c.id === id || c.userId === id || c.id === normalizedId || c.userId === `user-${normalizedId}`
            );
            return candidate || mockCandidates[0];
        }
        const response = await fetch(`${API_BASE_URL}/candidates/${id}`);
        if (!response.ok) throw new Error('Failed to fetch candidate');
        return response.json();
    },

    // Candidate Matches
    getCandidateMatches: async (): Promise<CandidateMatch[]> => {
        if (IS_MOCK) {
            await delay(500);
            return mockCandidateMatches;
        }
        const response = await fetch(`${API_BASE_URL}/matches`);
        if (!response.ok) throw new Error('Failed to fetch matches');
        return response.json();
    },

    // Applications
    getApplications: async (): Promise<Application[]> => {
        if (IS_MOCK) {
            await delay(400);
            return mockApplications;
        }
        const response = await fetch(`${API_BASE_URL}/applications`);
        if (!response.ok) throw new Error('Failed to fetch applications');
        return response.json();
    },

    // Recruiter Activities
    getRecruiterActivities: async (): Promise<RecruiterActivity[]> => {
        if (IS_MOCK) {
            await delay(400);
            return mockRecruiterActivities;
        }
        const response = await fetch(`${API_BASE_URL}/activities`);
        if (!response.ok) throw new Error('Failed to fetch activities');
        return response.json();
    },

    // Messages
    getMessages: async (): Promise<Message[]> => {
        if (IS_MOCK) {
            await delay(200);
            return mockMessages;
        }
        const response = await fetch(`${API_BASE_URL}/messages`);
        if (!response.ok) throw new Error('Failed to fetch messages');
        return response.json();
    }
};
