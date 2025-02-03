import { Trash2, Edit } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { api } from '~/services/Api';

interface CustomerProps {
  id: string;
  name: string;
  email: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}

function Main() {
  const [customers, setCustomers] = useState<CustomerProps[]>([]);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    loadCustomers();
  }, []);

  async function loadCustomers() {
    const response = await api.get('/customers');
    setCustomers(response.data);
  }

  return (
    <div className="w-full min-h-screen bg-gray-900 flex justify-center px-4">
      <main className="my-10 w-full md:max-w-2xl">
        <h1 className="text-4xl font-medium text-white">Clientes</h1>

        <form className="flex flex-col md:flex-row md:items-end my-6 gap-4">
          <div className="w-full md:w-1/2">
            <label className="block text-sm font-medium text-white" htmlFor="name">
              Nome
            </label>
            <input
              ref={nameRef}
              className="mt-1 p-2 focus:ring-white focus:border-white block w-full sm:text-sm border-gray-300 rounded-md"
              type="text"
              id="name"
              name="name"
              placeholder="Nome do cliente"
              required
            />
          </div>
          <div className="w-full md:w-1/2">
            <label className="block text-sm font-medium text-white" htmlFor="email">
              Email
            </label>
            <input
             ref={emailRef}
              className="mt-1 p-2 focus:ring-white focus:border-white block w-full sm:text-sm border-gray-300 rounded-md"
              type="email"
              id="email"
              name="email"
              placeholder="Email do cliente"
              required
            />
          </div>
          <div className="flex justify-center w-full md:w-auto">
            <button
              type="submit"
              className="w-full md:w-32 py-2 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600"
            >
              Cadastrar
            </button>
          </div>
        </form>

        <section className="flex flex-col space-y-4">
          {customers.map((customers) => (
            <article 
              key={customers.id}  
              className="w-full bg-white rounded-md shadow-md hover:scale-105 transition-transform duration-200">
              <div className="flex justify-between items-center p-4">
                <div>
                  <p>
                    <span className="font-medium">Name: </span> {customers.name}
                  </p>
                  <p>
                    <span className="font-medium">E-mail: </span> {customers.email}
                  </p>
                  <p>
                    <span className="font-medium">Status: </span>
                    <span className="inline-flex items-center">
                      <span
                        className={`w-2.5 h-2.5 rounded-full mr-2 ${customers.status ? 'bg-green-500' : 'bg-red-500'}`}
                      ></span>
                      {customers.status ? 'Ativo' : 'Inativo'}
                    </span>{' '}
                  </p>
                </div>

                <div className="flex justify-center p-4">
                  <button className="flex items-center px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600">
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 ml-4">
                    <Edit className="w-4 h-4 " />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}

export default Main;
