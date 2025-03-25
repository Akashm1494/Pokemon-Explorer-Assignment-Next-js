import { GetStaticProps } from "next";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

  type Pokemon = {
    name: string;
    url: string;
  };
  
export default function Home({ pokemons }: { pokemons: Pokemon[] }) {
  // const [isSearch, setIsSearch] = useState("");
  const [isSearch, setIsSearch] = useState<string>("");

  const filteredPokemons = pokemons.filter((pokemon) =>
    // console.log("Aksh Pokemon :",pokemon);
    pokemon.name.toLowerCase().includes(isSearch.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center p-12 mb-4">Pokemon Explorer</h1>
      
      <div className="relative mb-6">
        <input type="text" placeholder="Enter Pokemon Name.." className="p-2 border rounded w-full" value={isSearch} onChange={(e) => setIsSearch(e.target.value)}/>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        {filteredPokemons.map((pokemon) => {
          const id = pokemon.url.split("/").filter(Boolean).pop(); 
          
          return (
            <Link key={id} href={`/pokemon/${id}`} className="bg-white p-4 rounded-lg shadow-md">
              <Image src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} alt={pokemon.name} width={100} height={100} />
              <p className="text-lg font-semibold">{pokemon.name}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

////////////////
export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
  const data = await res.json();

  return {
    props: {
      pokemons: data.results,
    },
  };
};
