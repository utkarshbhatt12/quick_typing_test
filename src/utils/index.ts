export function getSampleText() {
  const texts = [
    "The internet has transformed how we communicate, work, and learn. With the rise of social media, people are now more connected than ever. Information spreads rapidly, and it's easier to stay updated with current events.",
    'The spread of misinformation, cyberbullying, and privacy concerns are significant issues. Despite these challenges, the positive aspects of the internet, such as access to vast knowledge and global communication, make it an essential part of our daily lives.',
    'Exercise is essential for maintaining both physical and mental well being. Regular physical activity helps in reducing the risk of chronic diseases like heart disease, diabetes, and obesity. It also improves mood, energy levels, and mental clarity.',
    'Beyond the physical benefits, exercise serves as a great stress reliever. In a fast paced world filled with daily challenges, setting aside time for physical activity can make a significant difference in overall health.',
    "Whether it's a brisk walk, yoga, or strength training, incorporating exercise into one's routine can lead to a healthier, more balanced life. As we continue to rely on the internet, it's crucial to balance its benefits with responsible usage.",
    "Poor dietary choices can lead to numerous health issues, including obesity, heart disease, and malnutrition. It's essential to be mindful of what we consume, as the food we eat has a direct impact on our overall health, energy levels, and mood.",
    "Traveling offers a unique opportunity to learn about different cultures, histories, and lifestyles. Whether it's a weekend getaway or a long journey across continents, travel opens up the mind and challenges preconceived notions.",
    'While planning a trip can sometimes be overwhelming, the rewards of discovering new places, meeting new people, and trying unfamiliar cuisines make it worthwhile. Ultimately, travel enriches life by providing memories and experiences that last a lifetime.',
    "Tools like planners, calendars, and apps can assist in staying organized. By effectively managing time, one can achieve a better work life balance, ensuring there's time for both professional responsibilities and personal interests.",
    'The rise of renewable energy sources is a crucial step toward a more sustainable future. Fossil fuels have been the primary source of energy for decades, but they come with significant environmental costs.',
    'While AI offers many advantages, it also raises ethical questions regarding job displacement, privacy, and decision making authority. As AI continues to evolve, society must navigate these challenges while maximizing its benefits.',
    'Effective communication is the foundation of strong relationships, both personal and professional. Being able to express thoughts clearly and listen actively helps avoid misunderstandings and build trust.',
    'On a personal level, it strengthens relationships by fostering empathy and understanding. Whether through verbal, written, or non verbal means, honing communication skills is essential for navigating the complexities of modern life.',
    "Education is a powerful tool for social and economic mobility. Access to quality education opens doors to opportunities and helps break the cycle of poverty. In today's knowledge driven economy, skills and knowledge are more critical than ever.",
    'However, there are still significant disparities in access to education, particularly in underdeveloped regions. Investing in education, from early childhood to higher learning, is key to building a more equitable society.',
    'The concept of work life balance has gained prominence in recent years. With the blurring lines between personal and professional life, especially with the rise of remote work, finding the right balance can be challenging.',
    'Technology has reshaped the way we work, learn, and socialize. The digital revolution has made it possible to connect with others across the globe instantly, access vast amounts of information, and work remotely from anywhere.',
    "As technology continues to evolve, it's important to stay informed about its impacts, both positive and negative. Embracing new tools while maintaining a balance with offline life can lead to a more fulfilling and productive existence.",
    'On a larger scale, businesses and governments are also recognizing the need for sustainable practices. By working together, society can reduce its environmental footprint and ensure that future generations inherit a healthier planet.',
    "Entrepreneurship is about more than just starting a business; it's about innovation, risk taking, and problem solving. Entrepreneurs identify gaps in the market and create solutions that benefit society.",
    "The ability to adapt, learn from mistakes, and persevere is crucial. In today's rapidly changing world, entrepreneurship is a key driver of economic growth and can lead to the creation of new industries and job opportunities.",
    "Leadership is about more than just giving orders; it's about inspiring and motivating others to achieve a common goal. A good leader listens to their team, values their input, and provides guidance while empowering others to take ownership of their work.",
    'Effective leadership fosters a collaborative environment where individuals feel valued and motivated. In times of uncertainty or crisis, strong leadership can make all the difference in guiding a team or organization through challenges.',
    "Financial literacy is a critical life skill that helps individuals make informed decisions about money. Understanding concepts such as budgeting, saving, investing, and credit management can have a profound impact on one's financial well being.",
    "By promoting financial education, individuals can gain control over their finances, plan for the future, and make decisions that align with their long term goals. Financial literacy is not just about wealth; it's about security and independence.",
    'Social media has become an integral part of modern life. Platforms like Facebook, Instagram, and Twitter allow people to connect, share ideas, and stay informed. However, social media also has its downsides.',
    "Reading books is a great way to expand knowledge and stimulate the imagination. Whether it's fiction or non-fiction, books provide a window into different worlds and perspectives.",
    'Music has the power to evoke emotions and bring people together. From classical symphonies to modern pop hits, music transcends language and cultural barriers, uniting people globally.',
    'The importance of sleep cannot be overstated. Quality sleep is essential for physical health, mental clarity, and emotional well-being. Prioritizing rest can lead to a more productive and balanced life.',
    'Volunteering is a meaningful way to give back to the community. By dedicating time and effort to causes that matter, individuals can make a positive impact and foster a sense of purpose.',
    'The art of cooking is both a skill and a creative outlet. Experimenting with flavors, ingredients, and techniques allows individuals to express themselves while creating delicious meals to share.',
    'Gardening is a therapeutic activity that connects people with nature. Tending to plants, whether flowers or vegetables, can reduce stress and provide a sense of accomplishment and serenity.',
    'Podcasts have become a popular medium for learning and entertainment. Covering topics from science to storytelling, podcasts offer a convenient way to gain insights and stay informed on the go.',
    'The beauty of nature is a source of inspiration and peace. From majestic mountains to serene beaches, spending time outdoors can rejuvenate the mind and foster a deeper appreciation for the environment.',
    'Meditation is a practice that promotes mindfulness and inner peace. By focusing on the present moment, individuals can reduce stress, improve concentration, and enhance overall well-being.',
    'Art and creativity are essential for self-expression. Whether through painting, writing, or music, engaging in creative activities allows individuals to explore their emotions and share their unique perspectives.',
  ];

  const randomIndex = Math.floor(Math.random() * texts.length);

  return texts[randomIndex];
}
