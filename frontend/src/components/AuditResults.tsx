import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
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
  Cell,
  AreaChart,
  Area
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown,
  Users, 
  Eye, 
  Heart, 
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  MoreHorizontal,
  Download,
  Share
} from 'lucide-react';

const AuditResults = () => {
  // Sample audit data
  const overallScore = 87;
  const authenticityScore = 92;
  const engagementScore = 84;
  const audienceScore = 89;

  const weeklyData = [
    { name: 'Sem 1', engagement: 4.2, reach: 125000 },
    { name: 'Sem 2', engagement: 3.8, reach: 132000 },
    { name: 'Sem 3', engagement: 4.5, reach: 118000 },
    { name: 'Sem 4', engagement: 4.1, reach: 145000 }
  ];

  const audienceData = [
    { name: '18-24', value: 35, color: '#3B82F6' },
    { name: '25-34', value: 42, color: '#10B981' },
    { name: '35-44', value: 18, color: '#F59E0B' },
    { name: '45+', value: 5, color: '#EF4444' }
  ];

  const engagementByTime = [
    { time: '6h', value: 8 },
    { time: '9h', value: 15 },
    { time: '12h', value: 28 },
    { time: '15h', value: 35 },
    { time: '18h', value: 42 },
    { time: '21h', value: 38 },
    { time: '24h', value: 12 }
  ];

  const metrics = [
    {
      title: 'Score Global',
      value: overallScore,
      max: 100,
      status: 'excellent',
      icon: TrendingUp,
      description: 'Profil hautement recommandé'
    },
    {
      title: 'Authenticité',
      value: authenticityScore,
      max: 100,
      status: 'excellent',
      icon: Shield,
      description: 'Audience authentique détectée'
    },
    {
      title: 'Engagement',
      value: engagementScore,
      max: 100,
      status: 'good',
      icon: Heart,
      description: 'Taux d\'engagement solide'
    },
    {
      title: 'Qualité Audience',
      value: audienceScore,
      max: 100,
      status: 'excellent',
      icon: Users,
      description: 'Audience de qualité premium'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-500';
      case 'good': return 'text-blue-500';
      case 'warning': return 'text-yellow-500';
      case 'poor': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent': return CheckCircle;
      case 'good': return CheckCircle;
      case 'warning': return AlertTriangle;
      case 'poor': return XCircle;
      default: return CheckCircle;
    }
  };

  return (
    <div className="pt-24 pb-12">
      <div className="max-w-7xl mx-auto container-padding">
        {/* Header */}
        <motion.div 
          className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h1 className="text-3xl font-bold mb-2">Résultats d'Audit</h1>
            <p className="text-muted-foreground">
              Analyse complète du profil @marie_dubois - Instagram
            </p>
          </div>
          <div className="flex gap-3 mt-4 md:mt-0">
            <Button variant="outline" className="btn-secondary">
              <Share className="h-4 w-4 mr-2" />
              Partager
            </Button>
            <Button className="btn-primary">
              <Download className="h-4 w-4 mr-2" />
              Télécharger PDF
            </Button>
          </div>
        </motion.div>

        {/* Score Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {metrics.map((metric, index) => {
            const StatusIcon = getStatusIcon(metric.status);
            return (
              <Card key={index} className="glass-card hover-lift border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <metric.icon className="h-6 w-6 text-primary" />
                    </div>
                    <StatusIcon className={`h-5 w-5 ${getStatusColor(metric.status)}`} />
                  </div>
                  <h3 className="font-semibold mb-2">{metric.title}</h3>
                  <div className="flex items-end space-x-2 mb-3">
                    <span className="text-3xl font-bold">{metric.value}</span>
                    <span className="text-muted-foreground">/{metric.max}</span>
                  </div>
                  <Progress value={metric.value} className="mb-2" />
                  <p className="text-sm text-muted-foreground">{metric.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </motion.div>

        {/* Charts Row 1 */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Weekly Performance */}
          <Card className="glass-card border-0">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Performance Hebdomadaire</CardTitle>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={weeklyData}>
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
                  <Area 
                    type="monotone" 
                    dataKey="engagement" 
                    stroke="#3B82F6" 
                    fill="#3B82F6"
                    fillOpacity={0.2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Audience Demographics */}
          <Card className="glass-card border-0">
            <CardHeader>
              <CardTitle className="text-lg">Démographie Audience</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={audienceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={100}
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
              <div className="mt-4 grid grid-cols-2 gap-2">
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
        </motion.div>

        {/* Charts Row 2 */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {/* Engagement by Time */}
          <Card className="glass-card border-0 lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg">Engagement par Heure</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={engagementByTime}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="time" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px'
                    }} 
                  />
                  <Bar 
                    dataKey="value" 
                    fill="#10B981" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Key Insights */}
          <Card className="glass-card border-0">
            <CardHeader>
              <CardTitle className="text-lg">Insights Clés</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center mb-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span className="font-medium text-green-800">Audience Authentique</span>
                </div>
                <p className="text-sm text-green-700">
                  98.2% d'audience réelle détectée
                </p>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center mb-2">
                  <TrendingUp className="h-5 w-5 text-blue-500 mr-2" />
                  <span className="font-medium text-blue-800">Croissance Stable</span>
                </div>
                <p className="text-sm text-blue-700">
                  +12.5% de followers ce mois
                </p>
              </div>
              
              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex items-center mb-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
                  <span className="font-medium text-yellow-800">À Surveiller</span>
                </div>
                <p className="text-sm text-yellow-700">
                  Baisse d'engagement récente
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AuditResults;

