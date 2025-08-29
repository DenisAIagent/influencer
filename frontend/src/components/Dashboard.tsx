import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  TrendingUp, 
  Users, 
  Eye, 
  Heart, 
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

const Dashboard = () => {
  // Sample data for charts
  const reachData = [
    { name: 'Lun', value: 300 },
    { name: 'Mar', value: 450 },
    { name: 'Mer', value: 320 },
    { name: 'Jeu', value: 580 },
    { name: 'Ven', value: 420 },
    { name: 'Sam', value: 680 },
    { name: 'Dim', value: 540 }
  ];

  const engagementData = [
    { name: '9h', value: 12 },
    { name: '11h', value: 19 },
    { name: '13h', value: 15 },
    { name: '15h', value: 25 },
    { name: '17h', value: 22 },
    { name: '19h', value: 18 },
    { name: '21h', value: 14 }
  ];

  const audienceData = [
    { name: 'Instagram', value: 45, color: '#3B82F6' },
    { name: 'TikTok', value: 35, color: '#10B981' },
    { name: 'YouTube', value: 20, color: '#F59E0B' }
  ];

  const influencers = [
    { name: 'Marie Dubois', platform: 'Instagram', followers: '125K', engagement: '4.2%', score: 92 },
    { name: 'Alex Martin', platform: 'TikTok', followers: '89K', engagement: '6.8%', score: 88 },
    { name: 'Sophie Laurent', platform: 'YouTube', followers: '67K', engagement: '3.9%', score: 85 },
    { name: 'Thomas Bernard', platform: 'Instagram', followers: '156K', engagement: '5.1%', score: 94 }
  ];

  const metrics = [
    {
      title: 'Portée Totale',
      value: '2.4M',
      change: '+12.5%',
      trend: 'up',
      icon: Eye
    },
    {
      title: 'Engagement Moyen',
      value: '4.8%',
      change: '+2.1%',
      trend: 'up',
      icon: Heart
    },
    {
      title: 'Nouveaux Followers',
      value: '12.3K',
      change: '-3.2%',
      trend: 'down',
      icon: Users
    },
    {
      title: 'Score Qualité',
      value: '89.2',
      change: '+5.7%',
      trend: 'up',
      icon: TrendingUp
    }
  ];

  return (
    <div className="pt-24 pb-12">
      <div className="max-w-7xl mx-auto container-padding">
        {/* Header */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Vue d'ensemble de vos campagnes d'influence et performances
          </p>
        </motion.div>

        {/* Metrics Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {metrics.map((metric, index) => (
            <Card key={index} className="glass-card hover-lift border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{metric.title}</p>
                    <p className="text-2xl font-bold">{metric.value}</p>
                    <div className="flex items-center mt-2">
                      {metric.trend === 'up' ? (
                        <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
                      )}
                      <span className={`text-sm ${
                        metric.trend === 'up' ? 'text-green-500' : 'text-red-500'
                      }`}>
                        {metric.change}
                      </span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <metric.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Charts Row */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Reach Chart */}
          <Card className="glass-card border-0">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Portée Hebdomadaire</CardTitle>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={reachData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px'
                    }} 
                  />
                  <Bar dataKey="value" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Engagement Chart */}
          <Card className="glass-card border-0">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Engagement par Heure</CardTitle>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={engagementData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px'
                    }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#10B981" 
                    strokeWidth={3}
                    dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Bottom Row */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {/* Audience Distribution */}
          <Card className="glass-card border-0">
            <CardHeader>
              <CardTitle className="text-lg">Répartition Audience</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={audienceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {audienceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {audienceData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm">{item.name}</span>
                    </div>
                    <span className="text-sm font-medium">{item.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Influencers */}
          <Card className="glass-card border-0 lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Top Influenceurs</CardTitle>
              <Button variant="ghost" size="sm">
                Voir tout
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {influencers.map((influencer, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-white/50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-medium">
                          {influencer.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">{influencer.name}</p>
                        <p className="text-sm text-muted-foreground">{influencer.platform}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{influencer.followers}</p>
                      <p className="text-sm text-muted-foreground">{influencer.engagement}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center">
                        <span className="text-lg font-bold text-primary mr-1">{influencer.score}</span>
                        <span className="text-sm text-muted-foreground">/100</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;

