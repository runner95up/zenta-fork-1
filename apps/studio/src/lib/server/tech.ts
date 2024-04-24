import { db } from "@packages/db";

export const getAllMetaTechs = async () => {
  const techs = await db.tech.findMany({
    select: {
      id: true,
      name: true,
      logo: true,
      description: true,
      updatedAt: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return techs;
};

export async function getTechById(id: string) {
  const tech = await db.tech.findUnique({
    where: {
      id,
    },
    include: {
      founders: true,
      versions: true,
    },
  });

  return tech;
}

// export async function getMetaTechs({ limit = 5, page = 1 }) {
//   const res = await db.tech.findMany({
//     select: {
//       id: true,
//       name: true,
//       logo: true,
//       description: true,
//       updatedAt: true,
//     },
//     orderBy: {
//       updatedAt: "desc",
//     },
//     skip: limit * (page - 1),
//     take: limit,
//   });

//   const techs: ItemMeta[] = res.map((tech) => {
//     return {
//       id: tech.id,
//       name: tech.name,
//       photo: tech.logo,
//       description: tech.description,
//       updatedAt: tech.updatedAt,
//     };
//   });

//   return techs;
// }
// export async function heatCountTech(id: string | undefined) {
//   if (!id) {
//     return;
//   }

//   const tech = await db.tech.update({
//     where: {
//       id,
//     },
//     data: {
//       heat: {
//         increment: 1,
//       },
//     },
//   });

//   return tech;
// }
