import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ThumbsUp, ThumbsDown, RotateCcw, Radio } from 'lucide-react';

interface VoteStats {
  positive: number;
  negative: number;
}

const VotingDashboard = () => {
  const [votes, setVotes] = useState<VoteStats>({ positive: 0, negative: 0 });

  const handleVote = (type: 'positive' | 'negative') => {
    setVotes(prev => ({
      ...prev,
      [type]: prev[type] + 1
    }));
  };

  const handleReset = () => {
    setVotes({ positive: 0, negative: 0 });
  };

  const totalVotes = votes.positive + votes.negative;
  const positivePercentage = totalVotes > 0 ? (votes.positive / totalVotes) * 100 : 0;
  const negativePercentage = totalVotes > 0 ? (votes.negative / totalVotes) * 100 : 0;

  return (
    <div className="min-h-screen p-6 flex items-center justify-center">
      <div className="w-full max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Badge variant="outline" className="glass px-4 py-2 text-sm font-medium">
              <Radio className="w-4 h-4 mr-2 text-vote-positive animate-pulse-glow" />
              LIVE
            </Badge>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Dashboard de Votação
          </h1>
          <p className="text-lg text-muted-foreground">
            Sistema de votação em tempo real
          </p>
        </div>

        {/* Stats Overview */}
        <Card className="glass p-8 animate-scale-in">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">Total de Votos</h2>
            <div className="text-6xl md:text-7xl font-bold text-foreground">
              {totalVotes}
            </div>
            
            {/* Progress Bar */}
            {totalVotes > 0 && (
              <div className="w-full h-4 bg-secondary rounded-full overflow-hidden">
                <div className="h-full flex">
                  <div 
                    className="bg-gradient-to-r from-vote-positive to-emerald-400 progress-bar"
                    style={{ width: `${positivePercentage}%` }}
                  />
                  <div 
                    className="bg-gradient-to-r from-vote-negative to-orange-500 progress-bar"
                    style={{ width: `${negativePercentage}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Vote Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Positive Votes Card */}
          <Card className="glass p-6 hover:scale-105 transition-all duration-300 group">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-full bg-vote-positive/10 group-hover:bg-vote-positive/20 transition-colors">
                  <ThumbsUp className="w-6 h-6 text-vote-positive" />
                </div>
                <Badge className="bg-vote-positive/10 text-vote-positive border-vote-positive/20">
                  {positivePercentage.toFixed(1)}%
                </Badge>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Votos Positivos</h3>
                <div className="text-4xl font-bold text-vote-positive">
                  {votes.positive}
                </div>
              </div>

              <Button 
                onClick={() => handleVote('positive')}
                className="w-full bg-gradient-to-r from-vote-positive to-emerald-400 hover:from-emerald-500 hover:to-vote-positive text-white border-0 shadow-lg hover:shadow-vote-positive/30 transition-all duration-300"
                size="lg"
              >
                <ThumbsUp className="w-5 h-5 mr-2" />
                Votar Positivo
              </Button>
            </div>
          </Card>

          {/* Negative Votes Card */}
          <Card className="glass p-6 hover:scale-105 transition-all duration-300 group">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-full bg-vote-negative/10 group-hover:bg-vote-negative/20 transition-colors">
                  <ThumbsDown className="w-6 h-6 text-vote-negative" />
                </div>
                <Badge className="bg-vote-negative/10 text-vote-negative border-vote-negative/20">
                  {negativePercentage.toFixed(1)}%
                </Badge>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Votos Negativos</h3>
                <div className="text-4xl font-bold text-vote-negative">
                  {votes.negative}
                </div>
              </div>

              <Button 
                onClick={() => handleVote('negative')}
                className="w-full bg-gradient-to-r from-vote-negative to-orange-500 hover:from-orange-500 hover:to-vote-negative text-white border-0 shadow-lg hover:shadow-vote-negative/30 transition-all duration-300"
                size="lg"
              >
                <ThumbsDown className="w-5 h-5 mr-2" />
                Votar Negativo
              </Button>
            </div>
          </Card>
        </div>

        {/* Reset Button */}
        <div className="text-center">
          <Button 
            onClick={handleReset}
            variant="outline"
            className="glass hover:glass-highlight border-border/50 hover:border-border transition-all duration-300"
            size="lg"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Resetar Votos
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VotingDashboard;