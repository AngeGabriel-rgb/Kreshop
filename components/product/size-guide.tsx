import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface SizeGuideProps {
  category: string
}

const sizeGuides = {
  Femme: {
    title: "Guide des tailles - Femme",
    description: "Mesures adaptées aux morphologies gabonaises",
    measurements: [
      { size: "XS", chest: "82-86", waist: "64-68", hips: "88-92" },
      { size: "S", chest: "86-90", waist: "68-72", hips: "92-96" },
      { size: "M", chest: "90-94", waist: "72-76", hips: "96-100" },
      { size: "L", chest: "94-98", waist: "76-80", hips: "100-104" },
      { size: "XL", chest: "98-102", waist: "80-84", hips: "104-108" },
      { size: "XXL", chest: "102-106", waist: "84-88", hips: "108-112" },
    ],
    headers: ["Taille", "Poitrine (cm)", "Taille (cm)", "Hanches (cm)"],
  },
  Homme: {
    title: "Guide des tailles - Homme",
    description: "Mesures adaptées aux morphologies gabonaises",
    measurements: [
      { size: "S", chest: "88-92", waist: "76-80", hips: "92-96" },
      { size: "M", chest: "92-96", waist: "80-84", hips: "96-100" },
      { size: "L", chest: "96-100", waist: "84-88", hips: "100-104" },
      { size: "XL", chest: "100-104", waist: "88-92", hips: "104-108" },
      { size: "XXL", chest: "104-108", waist: "92-96", hips: "108-112" },
    ],
    headers: ["Taille", "Poitrine (cm)", "Taille (cm)", "Hanches (cm)"],
  },
  Enfants: {
    title: "Guide des tailles - Enfants",
    description: "Tailles par âge et morphologie",
    measurements: [
      { size: "2-3 ans", chest: "52-54", waist: "50-52", hips: "54-56" },
      { size: "4-5 ans", chest: "56-58", waist: "52-54", hips: "58-60" },
      { size: "6-7 ans", chest: "60-62", waist: "54-56", hips: "62-64" },
      { size: "8-9 ans", chest: "64-66", waist: "56-58", hips: "66-68" },
      { size: "10-11 ans", chest: "68-70", waist: "58-60", hips: "70-72" },
    ],
    headers: ["Âge", "Poitrine (cm)", "Taille (cm)", "Hanches (cm)"],
  },
}

export function SizeGuide({ category }: SizeGuideProps) {
  const guide = sizeGuides[category as keyof typeof sizeGuides] || sizeGuides.Femme

  return (
    <Card>
      <CardHeader>
        <CardTitle>{guide.title}</CardTitle>
        <p className="text-sm text-muted-foreground">{guide.description}</p>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                {guide.headers.map((header) => (
                  <th key={header} className="text-left p-2 font-medium">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {guide.measurements.map((measurement) => (
                <tr key={measurement.size} className="border-b">
                  <td className="p-2 font-medium">{measurement.size}</td>
                  <td className="p-2">{measurement.chest}</td>
                  <td className="p-2">{measurement.waist}</td>
                  <td className="p-2">{measurement.hips}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 space-y-3 text-sm text-muted-foreground">
          <h4 className="font-medium text-foreground">Comment mesurer :</h4>
          <ul className="space-y-1">
            <li>
              • <strong>Poitrine :</strong> Mesurez autour de la partie la plus large de la poitrine
            </li>
            <li>
              • <strong>Taille :</strong> Mesurez autour de la partie la plus étroite de la taille
            </li>
            <li>
              • <strong>Hanches :</strong> Mesurez autour de la partie la plus large des hanches
            </li>
          </ul>
          <p className="text-xs">
            En cas de doute entre deux tailles, nous recommandons de choisir la taille supérieure.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
