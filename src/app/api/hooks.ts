import { useQuery } from '@tanstack/react-query';
import { api } from './adapter';

const STALE_TIME = 1000 * 60 * 5; // 5 minutes

export const useJobs = () => {
    return useQuery({
        queryKey: ['jobs'],
        queryFn: api.getJobs,
        staleTime: STALE_TIME,
    });
};

export const useJob = (id: string) => {
    return useQuery({
        queryKey: ['jobs', id],
        queryFn: () => api.getJobById(id),
        enabled: !!id,
        staleTime: STALE_TIME,
    });
};

export const useCandidates = () => {
    return useQuery({
        queryKey: ['candidates'],
        queryFn: api.getCandidates,
        staleTime: STALE_TIME,
    });
};

export const useCandidate = (id: string) => {
    return useQuery({
        queryKey: ['candidates', id],
        queryFn: () => api.getCandidateById(id),
        enabled: !!id,
        staleTime: STALE_TIME,
    });
};

export const useCandidateMatches = () => {
    return useQuery({
        queryKey: ['candidateMatches'],
        queryFn: api.getCandidateMatches,
        staleTime: STALE_TIME,
    });
};

export const useApplications = () => {
    return useQuery({
        queryKey: ['applications'],
        queryFn: api.getApplications,
        staleTime: STALE_TIME,
    });
};

export const useRecruiterActivities = () => {
    return useQuery({
        queryKey: ['recruiterActivities'],
        queryFn: api.getRecruiterActivities,
        staleTime: STALE_TIME, // Refresh less often
    });
};

export const useMessages = () => {
    return useQuery({
        queryKey: ['messages'],
        queryFn: api.getMessages,
        staleTime: 1000 * 30, // 30 seconds for messages
    });
};
