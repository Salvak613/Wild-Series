import { useEffect, useState } from "react";

interface Program {
  id: number;
  title: string;
  synopsis: string;
  poster: string;
  country: string;
  year: number;
}

const API_URL = import.meta.env.VITE_API_URL;

type ProgramArray = Program[];

function Programs() {
  const [programList, setProgramList] = useState<ProgramArray>([]);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const response = await fetch(`${API_URL}/api/programs`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result: ProgramArray = await response.json();
        setProgramList(result);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération de de satané cupcake :",
          error
        );
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <ul className="program-list" id="program-list">
        {programList.map((program) => (
          <li key={program.id}>
            <h3>{program.title}</h3>
            <p>{program.synopsis}</p>
            <img src={program.poster} alt={program.title} />
            <p>{program.country}</p>
            <p>{program.year}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Programs;
