export interface AvatarGuide {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatarUrl: string;
  voicePitch: number;
  voiceRate: number;
  preferredVoiceName?: string;
  tag: string;
}

export type OrgRoleId = "developer" | "administrator" | "marketing" | "sales" | "executive";

export interface OrgRole {
  id: OrgRoleId;
  title: string;
  shortTitle: string;
  tagline: string;
  badge: string;
  iconName: string;
  description: string;
  primaryTools: string[];
  suggestedTrackId: string;
  priorityOrder: number[]; // Walkthrough step IDs in order of priority for this role
  priorityReasons: Record<number, string>; // Why this step is prioritized for this role
  roleSpecificFocus: {
    gpuWorkspace: string;
    deployment: string;
    curriculum: string;
    mentorship: string;
    community: string;
  };
}

export interface WalkthroughStep {
  id: number;
  title: string;
  shortTitle: string;
  category: string;
  durationSec: number;
  script: string[];
  keyPoints: string[];
  suggestedAction: string;
  actionButtonLabel: string;
  roleOverrides?: Partial<Record<OrgRoleId, {
    title?: string;
    shortTitle?: string;
    category?: string;
    script?: string[];
    keyPoints?: string[];
    suggestedAction?: string;
    actionButtonLabel?: string;
    priorityBadge?: string;
  }>>;
}

export interface IncubationTrack {
  id: string;
  title: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  durationWeeks: number;
  badgeColor: string;
  iconName: string;
  summary: string;
  syllabus: {
    week: string;
    topic: string;
    deliverable: string;
  }[];
  technologies: string[];
  careerRoles: string[];
}

export interface MentorProfile {
  id: string;
  name: string;
  role: string;
  company: string;
  specialty: string;
  availableSlots: string[];
  rating: number;
  reviewsCount: number;
  imageUrl?: string;
}

export interface StudySquad {
  id: string;
  name: string;
  city: string;
  track: string;
  membersCount: number;
  maxMembers: number;
  meetingSchedule: string;
  isActive: boolean;
}

export interface GpuMetrics {
  gpuName: string;
  vramTotalGb: number;
  vramUsedGb: number;
  utilizationPercent: number;
  temperatureC: number;
  cudaVersion: string;
  driverVersion: string;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "agent";
  text: string;
  timestamp: string;
  relatedStep?: number;
}

export interface UserOnboardingProgress {
  selectedRoleId: OrgRoleId | null;
  roleConfirmed: boolean;
  selectedTrackId: string | null;
  gpuBenchmarkRan: boolean;
  deploymentTriggered: boolean;
  mentorBooked: boolean;
  squadJoined: boolean;
  completedSteps: number[];
  scholarName: string;
}
