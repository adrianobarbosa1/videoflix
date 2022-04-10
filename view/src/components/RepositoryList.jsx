import { useState, useEffect } from "webpack";
import { RepositoryItem } from "./RepositoryItem";

export function RepositorylList() {
  const [reposiroties, setRepositories] = useState([]);

  useEffect(() => {
    fetch('https://api.github.com/orgs/rocketseat/repos')
      .then(response => response.json())
      .then(data => setRepositories(data))
  }, []);

  return (
    <>
      <section className="repository-list">
        <h1>Lista de repositorio</h1>
        <ul>
          {repositories.map(repository => <RepositoryItem repository={repository} />)}

        </ul>
      </section>
    </>
  )
}
