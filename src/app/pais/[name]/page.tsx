
import CountryCard from "@/app/componentes/country-card";
import { Country } from "@/app/page";
import Image from "next/image";
import Link from "next/link";



async function getCountryByName(name: string): Promise<Country>{
const response = await fetch('https://restcountries.com/v3.1/all');
const countries: Country[] = await response.json();

return countries.find((country: Country)=> country.name.common === name)!;

}

async function getCountryBordersByName(name: string){
    const response = await fetch('https://restcountries.com/v3.1/all');
    const countries: Country[] = await response.json();
    
    const country = countries.find((country: Country)=> country.name.common === name)!;

      return country.borders?.map((border)=> {

        const borderCountry = countries.find(country => country.cca3 === border)!
        return {
            name: borderCountry.name.common,
            ptName: borderCountry.translations.por.common,
            flag: borderCountry.flags.svg,
            flagAlt: borderCountry.flags.alt
        }

    });
    
    }
    

export default async function Country({params: {name}}:{params: {name: string}}) {

       const country = await getCountryByName(decodeURI(name));
       const borderCountries = await getCountryBordersByName(decodeURI(name));
     

       const formatter = Intl.NumberFormat("en", {notation: "compact"});  

    return (

        <section className="flex flex-col container">
            <h1 className=" text-center font-bold text-2xl text-gray-800 my-10">{country.translations.por.common}</h1>
       
        <Link className="flex items-center" href="/">
           <Image  src="/arrow-back.svg" alt="arrow" width={20} height={20}/>
           Volar
        </Link>
        
        <article className="flex justify-between min-w-full p-10 bg-white rounded-xl">
            <section>
                {country.capital && (
                <h2 className="text-xl text-gray-800">                    
                 <b>Capital:</b> {country.capital}
                </h2>
                
                )}
                 {country.region && (                        
                <h2 className="text-xl text-gray-800">                   
                 <b>Continente:</b> {country.region} 
                 {country.subregion && `${country.subregion}`} 
                </h2>
                )}

                {country.population && (

                <h2 className="text-xl text-gray-800">
                 <b>População:</b> {formatter.format(country.population)}
                </h2>

                )}


                {country.languages && (

                <h2 className="text-xl text-gray-800">
                 <b>Línguas Faladas:</b> <br/>
                 {country.languages && (
                 Object.values(country.languages).map((linguage)=> (
                    <span  key={linguage} 
                    className="inline-block px-4 bg-indigo-800 mr-2 text-white text-sm rounded-full">
                        {linguage}
                    </span>
                 )))
                 }
                </h2>
                )}
                
            </section>
            <div className="relative h-auto w-60 shadow-md">
                <Image src={country.flags.svg} alt={country.flags.svg} fill className="object-cover" />
            </div>
        </article>

        <section>

            <h3 className="text-2xl font-semibold text-gray-800">Paises que fazem fronteira</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lx:grid-cols-5 gap-3 w-full my-3 ">
                {borderCountries?.map((border)=> 
                  <CountryCard {...border} /> )}
            </div>

        </section>

        </section>
       
    );
  }
  