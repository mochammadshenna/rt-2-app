"use client"

import { Vote } from "lucide-react"

export default function VotingSection() {
    return (
        <section className="px-6 py-8">
            {/* Section Header */}
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-white">Voting</h2>
            </div>

            {/* Voting Content */}
            <div className="space-y-6">
                {/* Voting Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                        <div className="flex items-center gap-3">
                            <Vote className="h-5 w-5 text-white/80" />
                            <div>
                                <p className="text-sm text-white/80">Active Proposals</p>
                                <p className="text-xl font-semibold text-white">3</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                        <div className="flex items-center gap-3">
                            <Vote className="h-5 w-5 text-white/80" />
                            <div>
                                <p className="text-sm text-white/80">Your Votes</p>
                                <p className="text-xl font-semibold text-white">1</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                        <div className="flex items-center gap-3">
                            <Vote className="h-5 w-5 text-white/80" />
                            <div>
                                <p className="text-sm text-white/80">Voting Power</p>
                                <p className="text-xl font-semibold text-white">1,250</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Active Proposals */}
                <div className="space-y-3">
                    <h3 className="text-lg font-medium text-white">Active Proposals</h3>

                    <div className="space-y-3">
                        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <h4 className="font-medium text-white mb-1">Proposal #1: Feature Enhancement</h4>
                                    <p className="text-sm text-white/70">Enhance platform capabilities and user experience</p>
                                </div>
                                <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded-full">
                                    Active
                                </span>
                            </div>

                            <div className="flex justify-between items-center text-sm text-white/70">
                                <span>Ends in 2 days</span>
                                <span>142 votes</span>
                            </div>
                        </div>

                        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <h4 className="font-medium text-white mb-1">Proposal #2: Community Initiative</h4>
                                    <p className="text-sm text-white/70">Launch new community engagement program</p>
                                </div>
                                <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded-full">
                                    Active
                                </span>
                            </div>

                            <div className="flex justify-between items-center text-sm text-white/70">
                                <span>Ends in 5 days</span>
                                <span>89 votes</span>
                            </div>
                        </div>

                        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <h4 className="font-medium text-white mb-1">Proposal #3: Treasury Management</h4>
                                    <p className="text-sm text-white/70">Optimize treasury allocation and rewards</p>
                                </div>
                                <span className="text-xs bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded-full">
                                    Ending Soon
                                </span>
                            </div>

                            <div className="flex justify-between items-center text-sm text-white/70">
                                <span>Ends in 1 day</span>
                                <span>203 votes</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="pt-4">
                    <div className="flex flex-wrap gap-3">
                        <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm font-medium border border-white/20 transition-colors">
                            View All Proposals
                        </button>
                        <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm font-medium border border-white/20 transition-colors">
                            Create Proposal
                        </button>
                        <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm font-medium border border-white/20 transition-colors">
                            Voting History
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}