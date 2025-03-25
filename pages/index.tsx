import { GetStaticProps } from "next";
import Link from "next/link";
import { useState } from "react";

export default function Home({ pokemons }: { pokemons: any[] }) {
  const [isSearch, setIsSearch] = useState("");

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
              <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} alt={pokemon.name} className="w-35 h-35"/>
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
