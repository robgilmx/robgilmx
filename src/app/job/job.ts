export interface Job {
  company: string,
  role: string,
  startDate: Date
  endDate: Date
  skills: string[],
  projects: number,
  webpage: string,
  imageUrl?: string
}
