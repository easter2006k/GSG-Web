const API_BASE = '/api/v1';

async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    credentials: 'include',
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'An error occurred' }));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }

  return response.json();
}

// Auth
export const authApi = {
  login: (data: { emailOrPhone: string; password: string }) =>
    fetchApi<{ user: any; token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  register: (data: any) =>
    fetchApi<{ user: any; token: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  me: () => fetchApi<any>('/auth/me'),
};

// Programmes
export const programmesApi = {
  getAll: () => fetchApi<any[]>('/programmes'),
  getOne: (id: string) => fetchApi<any>(`/programmes/${id}`),
  getBySlug: (slug: string) => fetchApi<any>(`/programmes/slug/${slug}`),
  register: (id: string, data: any) =>
    fetchApi<any>(`/programmes/${id}/registrations`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

// Colleges
export const collegesApi = {
  getAll: (params?: { search?: string; districtId?: string; type?: string }) => {
    const searchParams = new URLSearchParams(params);
    return fetchApi<any[]>(`/colleges?${searchParams}`);
  },
  getOne: (id: string) => fetchApi<any>(`/colleges/${id}`),
  getBySlug: (slug: string) => fetchApi<any>(`/colleges/slug/${slug}`),
  getFees: (id: string, year?: string) =>
    fetchApi<any[]>(`/colleges/${id}/fees${year ? `?year=${year}` : ''}`),
};

// Courses
export const coursesApi = {
  getAll: (params?: { search?: string; category?: string }) => {
    const searchParams = new URLSearchParams(params);
    return fetchApi<any[]>(`/courses?${searchParams}`);
  },
};

// Scholarships
export const scholarshipsApi = {
  getAll: () => fetchApi<any[]>('/scholarships'),
  getOne: (id: string) => fetchApi<any>(`/scholarships/${id}`),
  getBySlug: (slug: string) => fetchApi<any>(`/scholarships/slug/${slug}`),
  apply: (id: string, data: any) =>
    fetchApi<any>(`/scholarships/${id}/apply`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

// Counselling
export const counsellingApi = {
  createRequest: (data: any) =>
    fetchApi<any>('/counselling/requests', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  getRequestByReference: (reference: string) =>
    fetchApi<any>(`/counselling/requests/reference/${reference}`),
};

// Volunteers
export const volunteersApi = {
  apply: (data: any) =>
    fetchApi<any>('/volunteers/apply', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

// Content
export const contentApi = {
  getNews: () => fetchApi<any[]>('/news'),
  getNewsBySlug: (slug: string) => fetchApi<any>(`/news/slug/${slug}`),
  getTestimonials: () => fetchApi<any[]>('/testimonials'),
  getFaqs: () => fetchApi<any[]>('/faqs'),
  getImpactMetrics: () => fetchApi<any[]>('/impact-metrics'),
  getDistricts: () => fetchApi<any[]>('/districts'),
};

// Application Status
export const applicationApi = {
  getStatus: (reference: string) =>
    fetchApi<any>(`/application-status/${reference}`),
};

// Team Members (Leadership & Governance Directory)
export const teamApi = {
  getAllPublished: (dept?: string) =>
    fetchApi<any[]>(dept ? `/team-members?department=${dept}` : '/team-members'),
  getOne: (idOrSlug: string) => fetchApi<any>(`/team-members/${idOrSlug}`),
  getAllAdmin: (dept?: string, status?: string) => {
    const params = new URLSearchParams();
    if (dept) params.append('department', dept);
    if (status) params.append('status', status);
    const qs = params.toString() ? `?${params.toString()}` : '';
    return fetchApi<any[]>(`/team-members/admin/all${qs}`);
  },
  create: (data: any) =>
    fetchApi<any>('/team-members/admin/create', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  update: (id: string, data: any) =>
    fetchApi<any>(`/team-members/admin/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  updateStatus: (id: string, status: string) =>
    fetchApi<any>(`/team-members/admin/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),
  delete: (id: string) =>
    fetchApi<any>(`/team-members/admin/${id}`, {
      method: 'DELETE',
    }),
};