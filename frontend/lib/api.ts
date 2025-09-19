const API_BASE_URL = 'http://localhost:8000';

interface LoginCredentials {
  username: string; // FastAPI expects username field for email
  password: string;
}

interface RegisterData {
  email: string;
  username: string;
  password: string;
}

interface Sweet {
  id: number;
  name: string;
  category: string;
  price: number;
  quantity: number;
  description?: string;
  image?: string;
  created_at: string;
  updated_at?: string;
}

interface User {
  id: number;
  email: string;
  username: string;
  is_admin: boolean;
  created_at: string;
}

class ApiClient {
  private token: string | null = null;

  constructor() {
    this.token = localStorage.getItem('access_token');
  }

  private getHeaders() {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    
    return headers;
  }

  private async handleResponse(response: Response) {
    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: 'An error occurred' }));
      throw new Error(error.detail || 'An error occurred');
    }
    return response.json();
  }

  async register(data: RegisterData): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });
    
    return this.handleResponse(response);
  }

  async login(email: string, password: string): Promise<{ access_token: string; token_type: string }> {
    const formData = new FormData();
    formData.append('username', email); // FastAPI expects username field
    formData.append('password', password);

    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      body: formData,
    });
    
    const result = await this.handleResponse(response);
    
    // Store token
    this.token = result.access_token;
    localStorage.setItem('access_token', result.access_token);
    
    return result;
  }

  logout() {
    this.token = null;
    localStorage.removeItem('access_token');
  }

  async getSweets(): Promise<Sweet[]> {
    const response = await fetch(`${API_BASE_URL}/api/sweets/`, {
      headers: this.getHeaders(),
    });
    
    return this.handleResponse(response);
  }

  async searchSweets(params: {
    name?: string;
    category?: string;
    min_price?: number;
    max_price?: number;
  }): Promise<Sweet[]> {
    const searchParams = new URLSearchParams();
    
    if (params.name) searchParams.append('name', params.name);
    if (params.category) searchParams.append('category', params.category);
    if (params.min_price !== undefined) searchParams.append('min_price', params.min_price.toString());
    if (params.max_price !== undefined) searchParams.append('max_price', params.max_price.toString());

    const response = await fetch(`${API_BASE_URL}/api/sweets/search?${searchParams}`, {
      headers: this.getHeaders(),
    });
    
    return this.handleResponse(response);
  }

  async createSweet(sweet: Omit<Sweet, 'id' | 'created_at' | 'updated_at'>): Promise<Sweet> {
    const response = await fetch(`${API_BASE_URL}/api/sweets/`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(sweet),
    });
    
    return this.handleResponse(response);
  }

  async updateSweet(id: number, updates: Partial<Sweet>): Promise<Sweet> {
    const response = await fetch(`${API_BASE_URL}/api/sweets/${id}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(updates),
    });
    
    return this.handleResponse(response);
  }

  async deleteSweet(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/api/sweets/${id}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });
    
    await this.handleResponse(response);
  }

  async purchaseSweet(id: number, quantity: number = 1): Promise<Sweet> {
    const response = await fetch(`${API_BASE_URL}/api/sweets/${id}/purchase`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ quantity }),
    });
    
    return this.handleResponse(response);
  }

  async restockSweet(id: number, quantity: number): Promise<Sweet> {
    const response = await fetch(`${API_BASE_URL}/api/sweets/${id}/restock`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ quantity }),
    });
    
    return this.handleResponse(response);
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }
}

export const apiClient = new ApiClient();
export type { Sweet, User, LoginCredentials, RegisterData };