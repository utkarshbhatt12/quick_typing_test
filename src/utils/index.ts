export const calculateTypingSpeed = (
  wordCount: number,
  timeElapsed: number,
): number => {
  return wordCount / timeElapsed;
};

export function calculateAccuracy(
  mistakes: number,
  totalWords: number,
): number {
  if (totalWords === 0) return 0;

  const correctWords = totalWords - mistakes;

  return (correctWords / totalWords) * 100;
}

export function getSampleText() {
  const texts = [
    "The internet has transformed how we communicate, work, and learn. With the rise of social media, people are now more connected than ever. Information spreads rapidly, and it's easier to stay updated with current events.",
    'The spread of misinformation, cyberbullying, and privacy concerns are significant issues. Despite these challenges, the positive aspects of the internet, such as access to vast knowledge and global communication, make it an essential part of our daily lives.',
    'Exercise is essential for maintaining both physical and mental well being. Regular physical activity helps in reducing the risk of chronic diseases like heart disease, diabetes, and obesity. It also improves mood, energy levels, and mental clarity.',
    'Beyond the physical benefits, exercise serves as a great stress reliever. In a fast paced world filled with daily challenges, setting aside time for physical activity can make a significant difference in overall health.',
    "Whether it's a brisk walk, yoga, or strength training, incorporating exercise into one's routine can lead to a healthier, more balanced life. As we continue to rely on the internet, it's crucial to balance its benefits with responsible usage.",
    "In an age dominated by digital media, taking the time to read can be a form of mental relaxation, away from the constant barrage of notifications. With a vast variety of genres and authors to choose from, there's always something new to discover in the world of literature.",
    // 'The importance of a balanced diet cannot be overstated. A well rounded diet provides the essential nutrients the body needs to function optimally. Incorporating a mix of fruits, vegetables, whole grains, and lean proteins into daily meals ensures that the body gets the vitamins, minerals, and energy required.',
    "Poor dietary choices can lead to numerous health issues, including obesity, heart disease, and malnutrition. It's essential to be mindful of what we consume, as the food we eat has a direct impact on our overall health, energy levels, and mood.",
    "Traveling offers a unique opportunity to learn about different cultures, histories, and lifestyles. Whether it's a weekend getaway or a long journey across continents, travel opens up the mind and challenges preconceived notions.",
    'While planning a trip can sometimes be overwhelming, the rewards of discovering new places, meeting new people, and trying unfamiliar cuisines make it worthwhile. Ultimately, travel enriches life by providing memories and experiences that last a lifetime.',
    // "Time management is a skill that, when mastered, can significantly enhance productivity and reduce stress. With the demands of modern life, it's easy to feel overwhelmed by tasks and responsibilities. Prioritizing tasks, setting realistic goals, and breaking large projects into smaller, manageable steps can make a world of difference.",
    "Tools like planners, calendars, and apps can assist in staying organized. By effectively managing time, one can achieve a better work life balance, ensuring there's time for both professional responsibilities and personal interests.",
    "In today's fast paced world, mental health has become a major concern. With increasing pressure from work, relationships, and societal expectations, more people are experiencing stress, anxiety, and depression. It's essential to prioritize mental well being just as much as physical health.",
    'Regular breaks, mindfulness exercises, and talking to loved ones or professionals can provide relief. Awareness campaigns and open conversations about mental health help reduce the stigma associated with seeking help. Ensuring a supportive environment is vital for fostering mental well being and improving overall quality of life.',
    'The rise of renewable energy sources is a crucial step toward a more sustainable future. Fossil fuels have been the primary source of energy for decades, but they come with significant environmental costs.',
    'The burning of coal, oil, and natural gas contributes to air pollution and global warming. Renewable energy sources, such as solar, wind, and hydropower, offer cleaner alternatives that reduce our carbon footprint. As technology advances, renewable energy is becoming more accessible and cost effective, offering hope for a greener planet.',
    'Artificial intelligence (AI) is revolutionizing industries across the globe. From healthcare to finance, AI is being integrated to improve efficiency and decision making. In healthcare, for instance, AI can assist in diagnosing diseases, analyzing patient data, and even predicting outcomes.',
    'While AI offers many advantages, it also raises ethical questions regarding job displacement, privacy, and decision making authority. As AI continues to evolve, society must navigate these challenges while maximizing its benefits.',
    "Climate change is one of the most pressing issues of our time. The Earth's temperatures are rising due to the increased concentration of greenhouse gases, leading to more frequent and severe weather events. Glaciers are melting, sea levels are rising, and ecosystems are being disrupted.",
    "It's essential for governments, industries, and individuals to take action to mitigate the effects of climate change. Reducing carbon emissions, adopting renewable energy, and conserving natural resources are critical steps toward ensuring a more sustainable future for generations to come.",
    'Effective communication is the foundation of strong relationships, both personal and professional. Being able to express thoughts clearly and listen actively helps avoid misunderstandings and build trust.',
    'On a personal level, it strengthens relationships by fostering empathy and understanding. Whether through verbal, written, or non verbal means, honing communication skills is essential for navigating the complexities of modern life.',
    "Education is a powerful tool for social and economic mobility. Access to quality education opens doors to opportunities and helps break the cycle of poverty. In today's knowledge driven economy, skills and knowledge are more critical than ever.",
    'However, there are still significant disparities in access to education, particularly in underdeveloped regions. Investing in education, from early childhood to higher learning, is key to building a more equitable society.',
    'The concept of work life balance has gained prominence in recent years. With the blurring lines between personal and professional life, especially with the rise of remote work, finding the right balance can be challenging.',
    'Technology has reshaped the way we work, learn, and socialize. The digital revolution has made it possible to connect with others across the globe instantly, access vast amounts of information, and work remotely from anywhere.',
    "As technology continues to evolve, it's important to stay informed about its impacts, both positive and negative. Embracing new tools while maintaining a balance with offline life can lead to a more fulfilling and productive existence.",
    'Sustainability is becoming an increasingly important consideration in daily life. From the products we buy to the energy we consume, our choices have an impact on the planet. Reducing waste, recycling, and supporting eco friendly products are small steps individuals can take to contribute to a more sustainable world.',
    'On a larger scale, businesses and governments are also recognizing the need for sustainable practices. By working together, society can reduce its environmental footprint and ensure that future generations inherit a healthier planet.',
    "Entrepreneurship is about more than just starting a business; it's about innovation, risk taking, and problem solving. Entrepreneurs identify gaps in the market and create solutions that benefit society.",
    "The ability to adapt, learn from mistakes, and persevere is crucial. In today's rapidly changing world, entrepreneurship is a key driver of economic growth and can lead to the creation of new industries and job opportunities.",
    "Leadership is about more than just giving orders; it's about inspiring and motivating others to achieve a common goal. A good leader listens to their team, values their input, and provides guidance while empowering others to take ownership of their work.",
    'Effective leadership fosters a collaborative environment where individuals feel valued and motivated. In times of uncertainty or crisis, strong leadership can make all the difference in guiding a team or organization through challenges.',
    "Financial literacy is a critical life skill that helps individuals make informed decisions about money. Understanding concepts such as budgeting, saving, investing, and credit management can have a profound impact on one's financial well being.",
    "By promoting financial education, individuals can gain control over their finances, plan for the future, and make decisions that align with their long term goals. Financial literacy is not just about wealth; it's about security and independence.",
    'Social media has become an integral part of modern life. Platforms like Facebook, Instagram, and Twitter allow people to connect, share ideas, and stay informed. However, social media also has its downsides.',
  ];

  const randomIndex = Math.floor(Math.random() * texts.length);

  return texts[randomIndex];
}
