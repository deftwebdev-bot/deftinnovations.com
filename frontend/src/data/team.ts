export interface TeamMember {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
}

export const TEAM_DATA: TeamMember[] = [
  {
    id: "team-1",
    name: "Ajmal",
    role: "Founder & Creative Director",
    imageUrl: "",
  },
  {
    id: "team-2",
    name: "Team Member",
    role: "Partner & Head of Technology",
    imageUrl: "",
  },
];
