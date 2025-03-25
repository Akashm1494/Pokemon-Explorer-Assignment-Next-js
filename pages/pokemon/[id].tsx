import { GetStaticProps, GetStaticPaths } from "next";
import Image from "next/image";

type PokemonDetail = {
  name: string;
  sprites: { front_default: string };
  abilities: { ability: { name: string } }[];
  types: { type: { name: string } }[];
  stats: { stat: { name: string }; base_stat: number }[];
  moves: { move: { name: string } }[];
};

export default function PokemonDetail({ pokemon }: { pokemon: PokemonDetail }) {
  return (
    <div className="container mx-auto p-6 flex flex-col md:flex-row items-center justify-center gap-8 mt-10">
      <Image src={pokemon.sprites.front_default} alt={pokemon.name} width={200} height={200} layout="intrinsic" />

      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          {pokemon.name.toUpperCase()}
        </h1>
        
        {/* <div className="grid grid-cols-2 gap-4 text-lg font-semibold">
          <p className="bg-gray-100 p-2 rounded">Height: {pokemon.height}</p>
          <p className="bg-gray-100 p-2 rounded">Weight: {pokemon.weight}</p>
        </div> */}

        {/* Abilities */}
        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-gray-700">Abilities</h2>
          <ul className="mt-2 space-y-1">
            {pokemon.abilities.map((ability: any, index: number) => (
              <li key={index} className="bg-blue-100 px-3 py-1 rounded">
                {ability.ability.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Types */}
        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-gray-700">Types</h2>
          <div className="flex justify-center gap-2 mt-2">
            {pokemon.types.map((type: any, index: number) => (
              <span
                key={index}
                className="px-4 py-1 bg-blue-500 text-white rounded-full text-sm"
              >
                {type.type.name}
              </span>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-gray-700">Stats</h2>
          <ul className="mt-2 space-y-1">
            {pokemon.stats.map((stat: any, index: number) => (
              <li key={index} className="bg-gray-100 p-2 rounded">
                {stat.stat.name}: <strong>{stat.base_stat}</strong>
              </li>
            ))}
          </ul>
        </div>

        {/* Moves */}
        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-gray-700">Moves</h2>
          <p className="mt-2 text-sm bg-gray-100 p-2 rounded">
            {pokemon.moves.slice(0, 5).map((move: any) => move.move.name).join(", ")}
          </p>
        </div>
      </div>
    </div>
  );
}

// Define paths for dynamic routing
export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
  // console.log(res);
  const data = await res.json();

  const paths = data.results.map((_: any, index: number) => ({
    params: { id: String(index + 1) },
  }));

  return { paths, fallback: false };
};


///////////////
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${params?.id}`);
  const pokemon = await res.json();

  return {
    props: { pokemon },
  };
};
