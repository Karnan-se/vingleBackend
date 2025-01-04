interface Item {
  description?: string;
  duration?: string;
  title?: string;
  type?: string;
  [key: string]: any; // To handle any additional dynamic keys
}

interface Section {
  id: string | null;
  title?: string;
  items: Item[];
  [key: string]: any; // To handle additional section-level properties
}

interface RawData {
  name: string;
  description: string;
  category: string;
  price: string;
  tutorId: string;
  learningObjectives: string;
  [key: string]: any; // To handle dynamic keys like `sections[0].items[0][description]`
}

interface TransformedData {
  name: string;
  description: string;
  category: string;
  price: string;
  tutorId: string;
  learningObjectives: string[];
  sections: Section[];
}

export default function transformData(rawData: RawData): TransformedData {
  const { name, description, category, price, tutorId, learningObjectives, ...sectionsData } = rawData;

 
  const parsedLearningObjectives = JSON.parse(learningObjectives || "[]");

  // Transform sections
  const sections: Section[] = [];
  for (const key in sectionsData) {
    const match = key.match(/^sections\[(\d+)\](?:\.items\[(\d+)\]\[(.+?)\]|\.([a-zA-Z0-9]+))$/);
    if (match) {
      const [_, sectionIndex, itemIndex, prop, sectionProp] = match;
      const sectionIdx = Number(sectionIndex);

   
      if (!sections[sectionIdx]) {
        sections[sectionIdx] = { id: null, items: [] };
      }

      if (itemIndex !== undefined) {
        const itemIdx = Number(itemIndex);

        if (!sections[sectionIdx].items[itemIdx]) {
          sections[sectionIdx].items[itemIdx] = {};
        }

     
        sections[sectionIdx].items[itemIdx][prop] = sectionsData[key];
      } else if (sectionProp) {
        
        sections[sectionIdx][sectionProp] = sectionsData[key];
      }
    }
  }


  return {
    name,
    description,
    category,
    price,
    tutorId,
    learningObjectives: parsedLearningObjectives,
    sections
  };
}
