import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  account: {},
  profile: {},
  books: [],
  activeBook: {},
  searchBooks: [],
  myShelfBooks: [],
  activeClub: {},
  searchClubs: [],
  clubs: [],
  memberships: [],
  myMemberships: [],
  isMember: [],
  clubBooks: [],
  comments: []
})
