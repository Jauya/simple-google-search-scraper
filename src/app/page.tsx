import KeywordsForm from "@/components/KeywordsForm";
import Suggestions from "@/components/Suggestions";

export default function Home() {
  return (
    <main className="max-w-3xl w-full p-5 mx-auto">
      <h1 className="text-2xl font-medium text-center">Buscar sugerencias de Google</h1>
      <KeywordsForm />
      <Suggestions /> 
    </main>
  );
}
