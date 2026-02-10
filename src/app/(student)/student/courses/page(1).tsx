import { getLibraryData } from '@/app/actions/library';
import { HeroCarousel } from '@/components/library/HeroCarousel';
import { DailyProblemWidget } from '@/components/library/DailyProblemWidget';
import { CourseList } from '@/components/library/CourseList';
import { NeuCard } from '@/components/neu/NeuCard';
import { LayoutDashboard, BookOpen, Trophy } from 'lucide-react';

export default async function CourseLibraryPage() {
    const data = await getLibraryData();
    if (!data) return null;

    const { user, enrolled, catalog, dailyProblem, leaderboard } = data;

    return (
        <div className="min-h-screen bg-neu-base p-6 md:p-8 space-y-10 pb-32">

            {/* Top Bar (Simplified) */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-neu-text-main">
                        Welcome back, {user.name?.split(' ')[0]}!
                    </h1>
                    <p className="text-neu-text-sub text-sm">Pick up where you left off.</p>
                </div>
                {/* Avatar/Notifs could go here */}
            </div>

            <div className="grid grid-cols-12 gap-8">
                {/* Main Content (Left Rail) */}
                <div className="col-span-12 lg:col-span-9 space-y-12">

                    {/* Hero Carousel */}
                    <section className="space-y-4">
                        <HeroCarousel courses={enrolled} />
                    </section>

                    {/* Course Catalog */}
                    <section className="space-y-6">
                        <div className="flex items-center gap-3">
                            <NeuCard className="p-2 rounded-full !rounded-full w-10 h-10 flex items-center justify-center">
                                <BookOpen className="w-5 h-5 text-neu-accent" />
                            </NeuCard>
                            <h2 className="text-xl font-bold text-neu-text-main">Course Catalog</h2>
                        </div>
                        <CourseList courses={catalog} />
                    </section>
                </div>

                {/* Right Rail (Widgets) */}
                <div className="col-span-12 lg:col-span-3 space-y-8">

                    {/* Widget 1: Problem of the Day */}
                    <DailyProblemWidget problem={dailyProblem} />

                    {/* Widget 2: Leaderboard */}
                    <NeuCard className="p-6 space-y-6">
                        <div className="flex items-center gap-3 mb-2">
                            <Trophy className="w-5 h-5 text-amber-500" />
                            <h3 className="font-bold text-neu-text-main">Top Students</h3>
                        </div>
                        <div className="space-y-4">
                            {leaderboard.map((entry: any, i: number) => (
                                <div key={entry.id} className="flex items-center gap-4">
                                    <div className={`
                                        w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold
                                        ${i === 0 ? 'bg-amber-100 text-amber-600' : 'bg-neu-base shadow-neu-convex-xs text-neu-text-sub'}
                                    `}>
                                        #{i + 1}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="text-sm font-bold text-neu-text-main truncate">{entry.user.name}</div>
                                        <div className="text-xs text-neu-text-sub">{entry.xp} XP</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </NeuCard>

                    {/* Widget 3: Mini My Courses (optional specific list) */}
                    <NeuCard className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <LayoutDashboard className="w-5 h-5 text-neu-accent" />
                            <h3 className="font-bold text-neu-text-main">My Dashboard</h3>
                        </div>
                        <div className="space-y-3">
                            {enrolled.slice(0, 4).map((enrollment: any) => (
                                <div key={enrollment.id} className="flex items-center gap-3 group cursor-pointer">
                                    <div className="w-2 h-2 rounded-full bg-neu-accent group-hover:scale-125 transition-transform" />
                                    <div className="flex-1">
                                        <div className="text-sm font-medium text-neu-text-main group-hover:text-neu-accent transition-colors truncate">
                                            {enrollment.course.title}
                                        </div>
                                        <div className="text-[10px] text-neu-text-sub">
                                            {enrollment.course.tags?.[0] || 'Web'} • {enrollment.course.totalLessons} Lessons
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {enrolled.length === 0 && (
                                <p className="text-xs text-neu-text-sub">You haven't enrolled in any courses yet.</p>
                            )}
                        </div>
                    </NeuCard>

                </div>
            </div>
        </div>
    );
}
