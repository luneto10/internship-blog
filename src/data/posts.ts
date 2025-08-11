import type { Post } from "@/types";
import { createPhoto, createPhotosFromFolder } from "@/types";

export const posts: Post[] = [
    {
        id: "kickoff",
        title: "Week 1 — Kickoff & Setup at BTG Pactual",
        date: "2025-06-08",
        tags: ["onboarding", "tools"],
        cover: "src/photos/week1/1.jpeg",
        photos: createPhotosFromFolder("week1"),
        excerpt:
            "Laptop configured, repos cloned, meeting with the other summers, team and CEO (Roberto Sallouti).",
        body: [
            "I started my internship at BTG Pactual, largest and most important investment bank in Latin America, by getting access to the company repository and internal tooling. My mentor walked me through the branching strategy and CI rules. I also met with the other summers, team and CEO (Roberto Sallouti).",
            "I started to work on a small project to learn the codebase and the company's culture. I created an automation to generate an Excel sheet for the Tax Team to help with the Brazilian Government's tax collection.",
        ],
    },
    {
        id: "building",
        title: "Edifício Pátio Victor Malzoni (Pátio Victor Malzoni Building) - The Coolest Building Ever",
        date: "2025-06-09",
        tags: ["building", "architecture"],
        cover: "src/photos/predio/0.jpg",
        photos: createPhotosFromFolder("predio"),
        excerpt: "I worked in one of the coolest buildings in São Paulo.",
        body: [
            "The Pátio Victor Malzoni is in São Paulo, right on Avenida Faria Lima (Faria Lima Avenue). It’s huge, shiny, and just so beautiful. The glass walls reflect the city and make it look like it came straight out of a movie.",
            "When you walk inside, it’s all bright and open. The ceilings are super high and the place just feels fancy without even trying.",
            "I was lucky enough to work there for a while, and every day I couldn’t help but stop and look around. Even just going up the elevators felt like something special.",
        ],
    },
    {
        id: "eating",
        title: "Eating in São Paulo - The Best Experience in the World",
        date: "2025-06-10",
        tags: ["food", "restaurant"],
        cover: "src/photos/food/1.jpg",
        photos: createPhotosFromFolder("food"),
        excerpt:
            "São Paulo has the best food in the world, and my Sundays always start at Le Blé.",
        body: [
            "São Paulo is a paradise for anyone who loves food. You can find flavors from every corner of the planet, but also dishes that are unique to Brazil. Every street feels like it hides a new place to try.",
            "One of my favorite spots is a French bakery called Le Blé. I go there every Sunday morning, and it’s basically my happy place.",
            "They make the best pastrami bagels I’ve ever had, but the real star is their Croque Madame with fries — crispy, cheesy, and perfect. I always pair it with a creamy latte, and it’s the perfect way to start the day.",
            "I also love the pastries, especially the Tiramisu and the Crème Brûlée. It’s like a warm hug in a pastry.",
            "São Paulo has so many other great places to eat, but Le Blé is my go-to for a cozy, delicious start to the weekend.",
        ],
    },
    {
        id: "family",
        title: "Family in São Paulo (Some Came to Visit Me)",
        date: "2025-07-10",
        tags: ["family", "restaurant", "visit"],
        cover: "src/photos/family/1.jpg",
        photos: createPhotosFromFolder("family"),
        excerpt:
            "My uncles live in São Paulo, and my parents, brother, and girlfriend came to visit me.",
        body: [
            "When my family came to visit, we went straight to Bixiga (Bixiga neighborhood) — the neighborhood that’s basically a little slice of Italy in São Paulo.",
            "Back in the late 19th century, Italian immigrants came here looking for a better life, and they brought their pasta, pizza, and an unshakable belief that olive oil goes on everything.",
            "We ate like royalty. One day we went to the rooftop at L’Entrecôte de Paris by Olivier, because nothing says ‘family reunion’ like eating steak and unlimited fries with a view of the skyline.",
            "Of course, there was pizza. And pasta. And more pizza. Honestly, I think my stomach learned Italian that week.",
            "São Paulo really is the ultimate city for a food tour. Every corner has something delicious, and somehow there’s always room for dessert — even if you swear you can’t eat another bite.",
        ],
    },
    {
        id: "midinternship",
        title: "Mid-Internship - Real Part of the Team",
        date: "2025-07-12",
        tags: ["team", "project", "meeting"],
        cover: "src/photos/midintern/1.jpg",
        photos: createPhotosFromFolder("midintern"),
        excerpt:
            "By this point, I was being included in important decisions, meetings, and even lunches with partners and directors.",
        body: [
            "I don’t have many photos from this part of my internship because of security rules, but this was the moment I really started feeling important.",
            "I was being invited to big meetings, included in key decisions, and even called to have lunch with partners and top bosses — which, trust me, makes you feel like you’re doing something right.",
            "I was comfortable with the team, confident in my work, and starting to see myself as part of the place, even with the heavy work rhythm.",
            "Faria Lima (Faria Lima Avenue) is basically Brazil’s Wall Street, so the pace was intense, but that made it even more exciting. It felt like I was right where I was supposed to be.",
            "Every day was a day to learn, grow, and find somewhere new to lunch!.",
        ],
    },
    {
        id: "forfun",
        title: "For Fun - What I Did Outside of Work",
        date: "2025-08-10",
        tags: ["fun", "outside"],
        cover: "src/photos/fun/1.jpg",
        photos: createPhotosFromFolder("fun"),
        excerpt:
            "Outside work, I explored São Paulo: Beco do Batman, Museu do Ipiranga, and lots of basketball.",
        body: [
            "Beco do Batman (Batman Alley) was my weekend color explosion. It’s a small alley in Vila Madalena (Vila Madalena neighborhood) packed with giant murals that change all the time. You just turn a corner and boom, another wall screaming for a photo. Street art heaven, zero boredom.",
            "I also went with my family to the Museu do Ipiranga (Ipiranga Museum), inside Parque da Independência (Independence Park). The building is classic and the galleries tell Brazil’s history in a way that actually keeps you awake.",
            "That big painting in my photos is “Independência ou Morte!” (Independence or Death!) by Pedro Américo. It shows Dom Pedro I proclaiming Brazil’s independence on September 7, 1822, near the Ipiranga stream — dramatic horses, raised swords, the whole epic moment that marks the birth of the nation.",
            "In between museums and murals, I played a lot of basketball — pickup games on neighborhood courts until my legs begged for mercy. Best stress relief in the city.",
            "If you’re in São Paulo, you should visit these spots. Beco do Batman for the vibes, Museu do Ipiranga for the story, and any court for a quick game. Trust me — perfect combo.",
        ],
    },
    {
        id: "end",
        title: "THE END - Unforgettable Experience",
        date: "2025-08-29",
        tags: ["end", "experience"],
        cover: "src/photos/end/1.jpg",
        photos: createPhotosFromFolder("end"),
        excerpt: "TODO",
        body: ["TODO"],
    },
];
