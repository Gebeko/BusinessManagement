import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { MapIcon, BarChartIcon, AlertTriangleIcon, FileTextIcon, BellIcon, SearchIcon, TrendingUpIcon } from 'lucide-react'

const trafficData = [
  { time: '00:00', congestion: 20, vehicles: 500 },
  { time: '04:00', congestion: 15, vehicles: 300 },
  { time: '08:00', congestion: 80, vehicles: 2000 },
  { time: '12:00', congestion: 65, vehicles: 1500 },
  { time: '16:00', congestion: 90, vehicles: 2200 },
  { time: '20:00', congestion: 50, vehicles: 1000 },
]

const predictiveData = [
  { day: 'Mon', predicted: 75, actual: 78 },
  { day: 'Tue', predicted: 80, actual: 82 },
  { day: 'Wed', predicted: 85, actual: 81 },
  { day: 'Thu', predicted: 70, actual: 74 },
  { day: 'Fri', predicted: 90, actual: 88 },
  { day: 'Sat', predicted: 65, actual: 62 },
  { day: 'Sun', predicted: 60, actual: 58 },
]

export default function Component() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">CTMRT Dashboard</h1>
          <p className="text-gray-600">City Traffic Monitoring with RFID Technology</p>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline">
            <BellIcon className="h-4 w-4 mr-2" />
            Notifications
          </Button>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select area" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="downtown">Downtown</SelectItem>
              <SelectItem value="suburbs">Suburbs</SelectItem>
              <SelectItem value="highway">Highway</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Traffic Density</CardTitle>
            <BarChartIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-muted-foreground">+12% from last hour</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Vehicle Speed</CardTitle>
            <TrendingUpIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32 mph</div>
            <p className="text-xs text-muted-foreground">-5 mph from average</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <AlertTriangleIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">1 critical, 2 moderate</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="realtime" className="space-y-4">
        <TabsList>
          <TabsTrigger value="realtime">Real-Time Monitoring</TabsTrigger>
          <TabsTrigger value="historical">Historical Data</TabsTrigger>
          <TabsTrigger value="predictive">Predictive Analysis</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="realtime" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Real-Time Traffic Overview</CardTitle>
              <CardDescription>Live traffic data from RFID sensors</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <ChartContainer
                config={{
                  congestion: {
                    label: "Congestion Level",
                    color: "hsl(var(--chart-1))",
                  },
                  vehicles: {
                    label: "Vehicle Count",
                    color: "hsl(var(--chart-2))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trafficData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="congestion" stroke="var(--color-congestion)" strokeWidth={2} />
                    <Line yAxisId="right" type="monotone" dataKey="vehicles" stroke="var(--color-vehicles)" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Traffic Alerts</CardTitle>
                <CardDescription>Recent incidents and congestion warnings</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center space-x-2">
                    <AlertTriangleIcon className="h-4 w-4 text-red-500" />
                    <span>Critical: Multi-vehicle accident on Highway 101</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <AlertTriangleIcon className="h-4 w-4 text-yellow-500" />
                    <span>Moderate: Heavy congestion on Main St due to construction</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <AlertTriangleIcon className="h-4 w-4 text-yellow-500" />
                    <span>Moderate: Slow traffic on Downtown Bridge</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>GIS Integration</CardTitle>
                <CardDescription>Location-based traffic insights</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gray-200 rounded-md flex items-center justify-center">
                  <MapIcon className="h-24 w-24 text-gray-400" />
                  <span className="ml-4 text-gray-500">Interactive GIS map would be displayed here</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="historical" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Historical Traffic Analysis</CardTitle>
              <CardDescription>Compare traffic patterns over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Input type="date" />
                  <Button>Generate Report</Button>
                </div>
                <ChartContainer
                  config={{
                    congestion: {
                      label: "Congestion Level",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={trafficData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Bar dataKey="congestion" fill="var(--color-congestion)" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="predictive" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Predictive Traffic Analysis</CardTitle>
              <CardDescription>AI-driven traffic predictions vs actual data</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  predicted: {
                    label: "Predicted Congestion",
                    color: "hsl(var(--chart-1))",
                  },
                  actual: {
                    label: "Actual Congestion",
                    color: "hsl(var(--chart-2))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={predictiveData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line type="monotone" dataKey="predicted" stroke="var(--color-predicted)" strokeWidth={2} />
                    <Line type="monotone" dataKey="actual" stroke="var(--color-actual)" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Traffic Reports</CardTitle>
              <CardDescription>Generate and download detailed traffic analysis reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Report type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily Summary</SelectItem>
                      <SelectItem value="weekly">Weekly Analysis</SelectItem>
                      <SelectItem value="monthly">Monthly Trends</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input type="date" />
                  <Button>Generate Report</Button>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-gray-100 rounded-md">
                    <div className="flex items-center space-x-2">
                      <FileTextIcon className="h-4 w-4" />
                      <span>Daily Traffic Summary - 05/15/2023</span>
                    </div>
                    <Button variant="outline">Download</Button>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-gray-100 rounded-md">
                    <div className="flex items-center space-x-2">
                      <FileTextIcon className="h-4 w-4" />
                      <span>Weekly Traffic Analysis - Week 20, 2023</span>
                    </div>
                    <Button variant="outline">Download</Button>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-gray-100 rounded-md">
                    <div className="flex items-center space-x-2">
                      <FileTextIcon className="h-4 w-4" />
                      <span>Monthly Traffic Trends - April 2023</span>
                    </div>
                    <Button variant="outline">Download</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
