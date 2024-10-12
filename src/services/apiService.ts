import axios, { InternalAxiosRequestConfig } from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/project_skills',
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;


interface LoginResponse {
  email: string;
  token: string;
}

interface RegisterUserData {
  nome: string;
  email: string;
  senha: string;
  cargo: string;
}

interface Skill {
  id: number;
  nome: string;
  descricao: string;
  tecnologia: string;
  nivel: string;
  photo?: string;
}

export const login = async (email: string, senha: string): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>('/auth/login', { email, senha });
    return response.data;
  } catch (error: unknown) {
    console.error('Erro no login:', error);
    throw error;
  }
};

export const registerUser = async (data: RegisterUserData): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>('/auth/register', data);
    return response.data;
  } catch (error: unknown) {
    console.error('Erro no registro do usuário:', error);
    throw error;
  }
};

export const registerSkills = async (data: Omit<Skill, 'id'>): Promise<Skill> => {
  try {
    const response = await api.post<Skill>('/skills/register_skills', data);
    return response.data;
  } catch (error: unknown) {
    console.error('Erro ao registrar habilidades:', error);
    throw error;
  }
};

export const getSkills = async (): Promise<Skill[]> => {
  try {
    const response = await api.get<Skill[]>('/skills/listar_skills');
    return response.data;
  } catch (error: unknown) {
    console.error('Erro ao listar habilidades:', error);
    throw error;
  }
};

export const updateSkillInfo = async (id: number, updatedSkill: Omit<Skill, 'photo'>): Promise<Skill> => {
  try {
    const response = await api.put<Skill>(`/skills/alterar_infos/${id}`, updatedSkill);
    return response.data;
  } catch (error: unknown) {
    console.error('Erro ao atualizar as informações da skill:', error);
    throw error;
  }
};

export const deleteSkill = async (idSkill: number): Promise<void> => {
  try {
    console.log('Tentando deletar a skill com id:', idSkill);
    const response = await api.delete<void>(`/skills/deletar_skills/${idSkill}`);
    console.log('Requisição de deletar resposta:', response);
    return response.data;
  } catch (error: unknown) {
    console.error('Erro ao deletar habilidade:', error);
    throw error;
  }
};


export const uploadPhoto = async (id: number, file: File): Promise<Skill> => {
  if (!id) {
    console.error('ID da skill está faltando para o upload da foto.');
    throw new Error('ID da skill é necessário para fazer o upload da foto.');
  }

  const formData = new FormData();
  formData.append('photo', file);

  try {
    const response = await api.post<Skill>(`/skills/${id}/photo`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error: unknown) {
    console.error('Erro ao fazer upload da foto:', error);
    throw error;
  }
};


export const updateSkillPhoto = async (id: number, file: File): Promise<Skill> => {
  if (!id) {
    console.error('ID da skill está faltando para o upload da foto.');
    throw new Error('ID da skill é necessário para fazer o upload da foto.');
  }

  const formData = new FormData();
  formData.append('photo', file);

  try {
    const response = await api.post<Skill>(`/skills/${id}/photo`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error: unknown) {
    console.error('Erro ao fazer upload da foto:', error);
    throw error;
  }
};
