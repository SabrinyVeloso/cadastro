import { useState, useEffect } from 'react';

export default function Home() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState('');

  useEffect(() => {
    fetch('/api/users')
      .then((r) => r.json())
      .then(setUsers)
      .catch(console.error);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('Enviando...');
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email })
      });
      if (!res.ok) throw new Error(await res.text());
      setName('');
      setEmail('');
      const newUsers = await (await fetch('/api/users')).json();
      setUsers(newUsers);
      setStatus('Cadastrado com sucesso!');
    } catch (err) {
      console.error(err);
      setStatus('Erro ao cadastrar');
    }
    setTimeout(() => setStatus(''), 2500);
  }

  return (
    <div className="page">
      <div className="card">
        <div className="header">
          <div className="logo">CV</div>
          <div>
            <h1>Cadastro — trabalho escolar</h1>
            <p className="lead">Insira seu nome e email para participar.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Nome</label>
              <input value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <button type="submit" className="btn">Cadastrar</button>
            {status && <div className="status">{status}</div>}
          </div>
        </form>

        <div className="users">
          <h2>Usuários cadastrados</h2>
          {users.length === 0 && <p className="user-meta">Nenhum usuário cadastrado ainda.</p>}
          {users.map((u) => (
            <div className="user-item" key={u._id}>
              <div>
                <div style={{ fontWeight: 600 }}>{u.name}</div>
                <div className="user-meta">{u.email}</div>
              </div>
              <div className="user-meta">{new Date(u.createdAt || Date.now()).toLocaleString()}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
