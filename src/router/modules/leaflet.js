import { AppstoreOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import React from 'react';

const StatedView = React.lazy(() => import('@/views/Leaflet/Stated'));
const ControlView = React.lazy(() => import('@/views/Leaflet/Control'));
const MapOperationView = React.lazy(() =>
  import('@/views/Leaflet/MapOperation')
);
const MapEventView = React.lazy(() => import('@/views/Leaflet/MapEvent'));
const GraphicsOperationView = React.lazy(() =>
  import('@/views/Leaflet/GraphicsOperation')
);
const OtherGraphicsView = React.lazy(() =>
  import('@/views/Leaflet/OtherGraphics')
);
const DrawGraphicsView = React.lazy(() =>
  import('@/views/Leaflet/DrawGraphics')
);
const MapMarkerView = React.lazy(() => import('@/views/Leaflet/MapMarker'));
const ViewAnimationView = React.lazy(() =>
  import('@/views/Leaflet/ViewAnimation')
);
const AirlineAnimationView = React.lazy(() =>
  import('@/views/Leaflet/AirlineAnimation')
);
const ThirdPartyMapView = React.lazy(() =>
  import('@/views/Leaflet/ThirdPartyMap')
);
const OGCView = React.lazy(() => import('@/views/Leaflet/OGC'));
const HeatmapView = React.lazy(() => import('@/views/Leaflet/Heatmap'));
const MapShowView = React.lazy(() => import('@/views/Leaflet/MapShow'));
const DirectoryServiceView = React.lazy(() =>
  import('@/views/Leaflet/DirectoryService')
);
const FeatureQueryView = React.lazy(() =>
  import('@/views/Leaflet/FeatureQuery')
);
const FeatureEditView = React.lazy(() => import('@/views/Leaflet/FeatureEdit'));
const GeometryServiceView = React.lazy(() =>
  import('@/views/Leaflet/GeometryService')
);
const MapServiceView = React.lazy(() => import('@/views/Leaflet/MapService'));
const ThematicMapServiceView = React.lazy(() =>
  import('@/views/Leaflet/ThematicMapService')
);
const SpatialAnalysisView = React.lazy(() =>
  import('@/views/Leaflet/SpatialAnalysis')
);
const ProjectionTransformationView = React.lazy(() =>
  import('@/views/Leaflet/ProjectionTransformation')
);
const NetworkAnalysisView = React.lazy(() =>
  import('@/views/Leaflet/NetworkAnalysis')
);

export const leafletRoutes = [
  { path: 'leaflet/stated', component: <StatedView /> },
  { path: 'leaflet/control', component: <ControlView /> },
  { path: 'leaflet/mapOperation', component: <MapOperationView /> },
  { path: 'leaflet/mapEvent', component: <MapEventView /> },
  { path: 'leaflet/graphicsOperation', component: <GraphicsOperationView /> },
  { path: 'leaflet/otherGraphics', component: <OtherGraphicsView /> },
  { path: 'leaflet/drawGraphics', component: <DrawGraphicsView /> },
  { path: 'leaflet/mapMarker', component: <MapMarkerView /> },
  { path: 'leaflet/viewAnimation', component: <ViewAnimationView /> },
  { path: 'leaflet/airlineAnimation', component: <AirlineAnimationView /> },
  { path: 'leaflet/thirdPartyMap', component: <ThirdPartyMapView /> },
  { path: 'leaflet/OGC', component: <OGCView /> },
  { path: 'leaflet/heatmap', component: <HeatmapView /> },
  { path: 'leaflet/mapShow', component: <MapShowView /> },
  { path: 'leaflet/directoryService', component: <DirectoryServiceView /> },
  { path: 'leaflet/featureQuery', component: <FeatureQueryView /> },
  { path: 'leaflet/featureEdit', component: <FeatureEditView /> },
  { path: 'leaflet/geometryService', component: <GeometryServiceView /> },
  { path: 'leaflet/mapService', component: <MapServiceView /> },
  { path: 'leaflet/thematicMapService', component: <ThematicMapServiceView /> },
  { path: 'leaflet/spatialAnalysis', component: <SpatialAnalysisView /> },
  {
    path: 'leaflet/projectionTransformation',
    component: <ProjectionTransformationView />
  },
  { path: 'leaflet/networkAnalysis', component: <NetworkAnalysisView /> }
];

export const leafletMenu = {
  label: 'Leaflet',
  key: '/leaflet',
  icon: <AppstoreOutlined />,
  children: [
    {
      label: <Link to='/leaflet/stated'>??????</Link>,
      key: '/leaflet/stated'
    },
    {
      label: <Link to='/leaflet/control'>??????</Link>,
      key: '/leaflet/control'
    },
    {
      label: <Link to='/leaflet/mapOperation'>????????????</Link>,
      key: '/leaflet/mapOperation'
    },
    {
      label: <Link to='/leaflet/mapEvent'>????????????</Link>,
      key: '/leaflet/mapEvent'
    },
    {
      label: <Link to='/leaflet/graphicsOperation'>????????????</Link>,
      key: '/leaflet/graphicsOperation'
    },
    {
      label: <Link to='/leaflet/otherGraphics'>????????????</Link>,
      key: '/leaflet/otherGraphics'
    },
    {
      label: <Link to='/leaflet/drawGraphics'>????????????</Link>,
      key: '/leaflet/drawGraphics'
    },
    {
      label: <Link to='/leaflet/mapMarker'>????????????</Link>,
      key: '/leaflet/mapMarker'
    },
    {
      label: <Link to='/leaflet/viewAnimation'>????????????</Link>,
      key: '/leaflet/viewAnimation'
    },
    {
      label: <Link to='/leaflet/airlineAnimation'>????????????</Link>,
      key: '/leaflet/airlineAnimation'
    },
    {
      label: <Link to='/leaflet/thirdPartyMap'>???????????????</Link>,
      key: '/leaflet/thirdPartyMap'
    },
    {
      label: <Link to='/leaflet/OGC'>OGC??????</Link>,
      key: '/leaflet/OGC'
    },
    {
      label: <Link to='/leaflet/heatmap'>?????????</Link>,
      key: '/leaflet/heatmap'
    },
    {
      label: <Link to='/leaflet/mapShow'>????????????</Link>,
      key: '/leaflet/mapShow'
    },
    {
      label: <Link to='/leaflet/directoryService'>????????????</Link>,
      key: '/leaflet/directoryService'
    },
    {
      label: <Link to='/leaflet/featureQuery'>????????????</Link>,
      key: '/leaflet/featureQuery'
    },
    {
      label: <Link to='/leaflet/featureEdit'>????????????</Link>,
      key: '/leaflet/featureEdit'
    },
    {
      label: <Link to='/leaflet/geometryService'>??????????????????</Link>,
      key: '/leaflet/geometryService'
    },
    {
      label: <Link to='/leaflet/mapService'>????????????</Link>,
      key: '/leaflet/mapService'
    },
    {
      label: <Link to='/leaflet/thematicMapService'>???????????????</Link>,
      key: '/leaflet/thematicMapService'
    },
    {
      label: <Link to='/leaflet/spatialAnalysis'>????????????</Link>,
      key: '/leaflet/spatialAnalysis'
    },
    {
      label: <Link to='/leaflet/projectionTransformation'>????????????</Link>,
      key: '/leaflet/projectionTransformation'
    },
    {
      label: <Link to='/leaflet/networkAnalysis'>????????????</Link>,
      key: '/leaflet/networkAnalysis'
    }
  ]
};
