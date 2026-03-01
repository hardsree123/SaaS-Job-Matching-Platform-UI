import { useState, useEffect } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { MessageSquare, Calendar, Eye, MoreVertical } from 'lucide-react';
import { useJobs, useCandidates } from '../../api/hooks';
import { toast } from 'sonner';

type PipelineStage = 'applied' | 'screening' | 'interview' | 'offer' | 'hired' | 'rejected';

interface PipelineCandidate {
  id: string;
  name: string;
  avatar?: string;
  title: string;
  stage: PipelineStage;
  jobTitle: string;
  appliedDate: string;
}

const ITEM_TYPE = 'candidate';

const stages: { id: PipelineStage; label: string; color: string }[] = [
  { id: 'applied', label: 'Applied', color: 'bg-blue-500' },
  { id: 'screening', label: 'Screening', color: 'bg-purple-500' },
  { id: 'interview', label: 'Interview', color: 'bg-yellow-500' },
  { id: 'offer', label: 'Offer', color: 'bg-green-500' },
  { id: 'hired', label: 'Hired', color: 'bg-emerald-500' },
  { id: 'rejected', label: 'Rejected', color: 'bg-gray-400' },
];

function CandidateCard({ candidate, onMove }: { candidate: PipelineCandidate; onMove: (id: string, stage: PipelineStage) => void }) {
  const [{ isDragging }, drag] = useDrag({
    type: ITEM_TYPE,
    item: { id: candidate.id, currentStage: candidate.stage },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag as any}
      className={`bg-white rounded-lg border border-gray-200 p-3 cursor-move hover:shadow-md transition-shadow ${isDragging ? 'opacity-50' : 'opacity-100'
        }`}
    >
      <div className="flex items-start gap-3 mb-3">
        <Avatar className="w-10 h-10">
          <AvatarImage src={candidate.avatar} />
          <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm text-gray-900 truncate">{candidate.name}</p>
          <p className="text-xs text-gray-600 truncate">{candidate.title}</p>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-2">
        <p className="text-xs text-gray-600">
          <span className="font-medium">Applied for:</span> {candidate.jobTitle}
        </p>
        <p className="text-xs text-gray-500">
          {new Date(candidate.appliedDate).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
          })}
        </p>
      </div>

      <div className="flex gap-1 mt-3">
        <Button variant="ghost" size="sm" className="h-7 text-xs flex-1">
          <Eye className="w-3 h-3 mr-1" />
          View
        </Button>
        <Button variant="ghost" size="sm" className="h-7 text-xs flex-1">
          <MessageSquare className="w-3 h-3 mr-1" />
          Message
        </Button>
      </div>
    </div>
  );
}

function PipelineColumn({
  stage,
  candidates,
  onMove,
}: {
  stage: typeof stages[0];
  candidates: PipelineCandidate[];
  onMove: (id: string, newStage: PipelineStage) => void;
}) {
  const [{ isOver }, drop] = useDrop({
    accept: ITEM_TYPE,
    drop: (item: { id: string; currentStage: PipelineStage }) => {
      if (item.currentStage !== stage.id) {
        onMove(item.id, stage.id);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div ref={drop as any} className="flex-1 min-w-[280px]">
      <div className="bg-gray-50 rounded-lg p-4 h-full">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${stage.color}`} />
            <h3 className="font-semibold text-gray-900">{stage.label}</h3>
            <Badge variant="secondary" className="text-xs">
              {candidates.length}
            </Badge>
          </div>
        </div>

        <div
          className={`space-y-3 min-h-[400px] transition-colors ${isOver ? 'bg-blue-50 rounded-lg p-2' : ''
            }`}
        >
          {candidates.map((candidate) => (
            <CandidateCard key={candidate.id} candidate={candidate} onMove={onMove} />
          ))}
          {candidates.length === 0 && (
            <div className="flex items-center justify-center h-32 text-sm text-gray-400">
              No candidates
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function HiringPipeline() {
  const { data: jobs = [], isLoading: isLoadingJobs } = useJobs();
  const { data: candidates = [], isLoading: isLoadingCandidates } = useCandidates();

  const [pipelineCandidates, setPipelineCandidates] = useState<PipelineCandidate[]>([]);
  const [selectedJob, setSelectedJob] = useState<string>('all');

  useEffect(() => {
    if (jobs.length > 0 && candidates.length > 0) {
      setPipelineCandidates([
        {
          id: '1',
          name: candidates[0]?.name || 'Unknown',
          avatar: candidates[0]?.avatar || '',
          title: candidates[0]?.title || 'Candidate',
          stage: 'interview',
          jobTitle: jobs[0]?.title || 'Job',
          appliedDate: '2026-02-21T10:00:00Z',
        },
        {
          id: '2',
          name: candidates[1]?.name || 'Unknown',
          avatar: candidates[1]?.avatar || '',
          title: candidates[1]?.title || 'Candidate',
          stage: 'screening',
          jobTitle: jobs[1]?.title || 'Job',
          appliedDate: '2026-02-23T09:00:00Z',
        },
        {
          id: '3',
          name: candidates[2]?.name || 'Unknown',
          avatar: candidates[2]?.avatar || '',
          title: candidates[2]?.title || 'Candidate',
          stage: 'applied',
          jobTitle: jobs[2]?.title || 'Job',
          appliedDate: '2026-02-26T14:00:00Z',
        },
        {
          id: '4',
          name: candidates[3]?.name || 'Unknown',
          avatar: candidates[3]?.avatar || '',
          title: candidates[3]?.title || 'Candidate',
          stage: 'offer',
          jobTitle: jobs[3]?.title || 'Job',
          appliedDate: '2026-02-18T11:00:00Z',
        },
        // Additional static mocks with jobs to supplement visualization
        {
          id: '5',
          name: 'Omar Khalid',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Omar',
          title: 'Backend Developer',
          stage: 'applied',
          jobTitle: jobs[0]?.title || 'Job',
          appliedDate: '2026-02-27T10:00:00Z',
        },
        {
          id: '6',
          name: 'Laila Mohammed',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Laila',
          title: 'Data Analyst',
          stage: 'screening',
          jobTitle: jobs[1]?.title || 'Job',
          appliedDate: '2026-02-25T15:00:00Z',
        },
        {
          id: '7',
          name: 'Ali Rahman',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ali',
          title: 'Product Designer',
          stage: 'interview',
          jobTitle: jobs[3]?.title || 'Job',
          appliedDate: '2026-02-20T12:00:00Z',
        },
        {
          id: '8',
          name: 'Noor Abdullah',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Noor',
          title: 'Frontend Developer',
          stage: 'hired',
          jobTitle: jobs[4]?.title || 'Job',
          appliedDate: '2026-02-10T09:00:00Z',
        },
      ]);
    }
  }, [jobs, candidates]);

  const handleMove = (candidateId: string, newStage: PipelineStage) => {
    setPipelineCandidates((prev) =>
      prev.map((candidate) =>
        candidate.id === candidateId ? { ...candidate, stage: newStage } : candidate
      )
    );

    const candidate = pipelineCandidates.find(c => c.id === candidateId);
    const stageName = stages.find(s => s.id === newStage)?.label;
    toast.success(`${candidate?.name} moved to ${stageName}`);
  };

  const filteredCandidates = selectedJob === 'all'
    ? pipelineCandidates
    : pipelineCandidates.filter(c => c.jobTitle === selectedJob);

  if (isLoadingJobs || isLoadingCandidates) {
    return <div className="p-8 text-center bg-gray-50 rounded-lg">Loading pipeline...</div>;
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Hiring Pipeline</h1>
            <p className="text-gray-600">Track and manage candidates through your hiring process</p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={selectedJob} onValueChange={setSelectedJob}>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Filter by job" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Jobs</SelectItem>
                {jobs.map((job) => (
                  <SelectItem key={job.id} value={job.title}>
                    {job.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Interview
            </Button>
          </div>
        </div>

        {/* Pipeline Stats */}
        <div className="grid grid-cols-6 gap-4">
          {stages.map((stage) => {
            const count = filteredCandidates.filter((c) => c.stage === stage.id).length;
            return (
              <Card key={stage.id}>
                <CardContent className="p-4">
                  <div className={`w-full h-1 ${stage.color} rounded-full mb-3`} />
                  <p className="text-2xl font-bold text-gray-900">{count}</p>
                  <p className="text-sm text-gray-600">{stage.label}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Kanban Board */}
        <Card>
          <CardHeader>
            <CardTitle>Pipeline Board</CardTitle>
            <p className="text-sm text-gray-600">Drag and drop candidates to move them between stages</p>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex gap-4 overflow-x-auto pb-4">
              {stages.map((stage) => (
                <PipelineColumn
                  key={stage.id}
                  stage={stage}
                  candidates={filteredCandidates.filter((c) => c.stage === stage.id)}
                  onMove={handleMove}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Upcoming Interviews</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-gray-900">3</p>
              <p className="text-sm text-gray-600 mt-1">This week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Average Time to Hire</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-gray-900">18 days</p>
              <p className="text-sm text-gray-600 mt-1">Across all positions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Offer Acceptance Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-gray-900">85%</p>
              <p className="text-sm text-gray-600 mt-1">Last 30 days</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DndProvider>
  );
}
