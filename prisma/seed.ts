import { prisma } from "../lib/prisma";
import { v4 as uuidv4 } from "uuid";

const moduleSeeds = [
  {
    title: "Module 0: Introduction",
    slug: "module-0",
    order: 0,
    description: "Course introduction, framing, and strategic foundations.",
  },
  {
    title: "Module 1: Neurobiology & Growth Mindset",
    slug: "module-1",
    order: 1,
    description: "Goal-seeking neurobiology, mindset, and stress-performance dynamics.",
  },
  {
    title: "Module 2: Learning, Habits & Measurement",
    slug: "module-2",
    order: 2,
    description: "Learning mechanics, habit formation, and measurable improvement.",
  },
  {
    title: "Module 3: Win With NO",
    slug: "module-3",
    order: 3,
    description: "Negotiation principles and practical systems from Camp and Voss.",
  },
  {
    title: "Module 4: Integrating Big 10 with Camp & Voss",
    slug: "module-4",
    order: 4,
    description: "Applying personality dynamics to negotiation and field execution.",
  },
  {
    title: "Module 5: Change Agency",
    slug: "module-5",
    order: 5,
    description: "Behavioral change frameworks, implementation, and accountability.",
  },
  {
    title: "Module 6: Measurement and Accountability",
    slug: "module-6",
    order: 6,
    description: "Sustaining progress with self-training and daily tracking practices.",
  },
] as const;

async function main() {
  const courseId = uuidv4()

  const course = await prisma.courses.upsert({
    where: { slug: "swift-course" },
    update: {
      title: "Cognijin Course",
      description: "A structured program covering mindset, habits, negotiation, and behavior change.",
    },
    create: {
      id: courseId,
      title: "Cognijin Course",
      slug: "swift-course",
      description: "A structured program covering mindset, habits, negotiation, and behavior change.",
      updatedAt: new Date(),
    },
  });

  for (const moduleSeed of moduleSeeds) {
    await prisma.modules.upsert({
      where: {
        courseId_slug: {
          courseId: course.id,
          slug: moduleSeed.slug,
        },
      },
      update: {
        title: moduleSeed.title,
        description: moduleSeed.description,
        order: moduleSeed.order,
      },
      create: {
        id: uuidv4(),
        courseId: course.id,
        title: moduleSeed.title,
        description: moduleSeed.description,
        slug: moduleSeed.slug,
        order: moduleSeed.order,
        updatedAt: new Date(),
      },
    });
  }

  console.log(`Seeded course: ${course.title} (${course.slug})`);
  console.log(`Seeded modules: ${moduleSeeds.length}`);
}

main()
  .catch((error) => {
    console.error("Seeding failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
