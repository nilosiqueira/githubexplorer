import React, { useState, FormEvent } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { Title, Form, Repositories } from './styles';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';
import Repository from '../Repository';

interface Repository {
    login: string;
    id: string;
    avatar_url: string;

}

const Dashboard: React.FC = () => {
    const [newRepo, setNewRepo] = useState('');
    const [repositories, setRepositories] = useState<Repository[]>([]);

   async function handleAddRepository(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
            const response = await api.get<Repository>(`users/${newRepo}`)

            const repository = response.data;

            setRepositories([...repositories, repository]);
            setNewRepo('');
            console.log(repository);
    }

    return (
        <>
            <img src={logoImg} alt="Logo da aplicação" />
            <Title>Explore repositórios no Github</Title>

            <Form onSubmit={handleAddRepository}>
                <input type="text" value={newRepo} onChange={(e) => setNewRepo(e.target.value)} placeholder='Digite o nome do repositório' />
                <button type='submit'>Pesquisar</button>
            </Form>
            <Repositories>
                {repositories.map(repository => (
                
                    <a key={repository.login} href="teste">
                    <img 
                    src={repository.avatar_url} 
                    />
                    <div>
                        <strong>{repository.login}</strong>
                        <p>{repository.id}</p>
                    </div>

                    <FiChevronRight size={20} />
                </a>
                ))};
            </Repositories>
        </>
    );
};

export default Dashboard;