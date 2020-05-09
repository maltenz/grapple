import { AssetStyles } from './styles';
import { ModeType, UtilityType, ColorType } from '../types';

import { Color } from './colors';
import { VIBRATE_DUR } from './system';

// core components
import {
  CoreAvatar,
  CoreBadge,
  CoreBullet,
  CoreButton,
  CoreNavBar,
  CorePullBar,
  CoreSegmentedControl,
  CoreText,
} from '../components/core';

// base components
import Badge from '../components/base/Badge';
import Border from '../components/base/Border';
import Bullet from '../components/base/Bullet';
import BulletPager from '../components/base/BulletPager';
import Button, {
  ButtonLargeHeight,
  ButtonNormalHeight,
  ButtonSmallHeight,
} from '../components/base/Button';
import Gallery, { GalleryItemType } from '../components/base/Gallery';
import Container from '../components/base/Container';
import MenuItem, { MenuItemHeight } from '../components/base/MenuItem';
import MenuItemAccount from '../components/base/MenuItemAccount';
import MenuItemThumbnail from '../components/base/MenuItemThumbnail';
import Navigation, { NavigationIcon } from '../components/base/Navigation';
import NavBarUser from '../components/base/NavBarUser';
import NavBarUserPostEdit from '../components/base/NavBarUserPostEdit';
import NavBarUserStoryIncident from '../components/base/NavBarUserStoryIncident';
import Panel, { PanelProps } from '../components/base/Panel';
import Post from '../components/base/Post';
import PostContent from '../components/base/PostContent';
import PostContentHeader from '../components/base/PostContentHeader';
import PostContentHeading from '../components/base/PostContentHeading';
import PostsEditSlider, { PostsEditItemType } from '../components/base/PostsEditSlider';
import PullBar, { PullBarHeight } from '../components/base/PullBar';
import TabbarBackground from '../components/base/TabbarBackground';
import TabbarCircleButton from '../components/base/TabbarCircleButton';
import Text, { TextProps, PlaceholderTextColor } from '../components/base/Text';
import Thumbnail, { ThumbnailDimension } from '../components/base/Thumbnail';
import Search from '../components/base/Search';

// svg
// -- core
import SvgTabbarBackground, {
  SvgTabbarBackgroundWidth,
  SvgTabbarBackgroundHeight,
} from './svg/SvgTabbarBackground';

// -- graphis
import SvgLogoGrapple from './svg/SvgGrappleLogo';
import SvgBlob from './svg/SvgBlob';
import SvgBlobMirrored from './svg/SvgBlobMirrored';
import SvgRulerRightArrow from './svg/SvgRulerRightArrow';
// -- icons large
import SvgIconAccount from './svg/icons/large/SvgIconAccount';
import SvgIconBookmark from './svg/icons/large/SvgIconBookmark';
import SvgIconChat from './svg/icons/large/SvgIconChat';
import SvgIconDown from './svg/icons/large/SvgIconDown';
import SvgIconEdit from './svg/icons/large/SvgIconEdit';
import SvgIconFlash from './svg/icons/large/SvgIconFlash';
import SvgIconFlashAuto from './svg/icons/large/SvgIconFlashAuto';
import SvgIconFlashOff from './svg/icons/large/SvgIconFlashOff';
import SvgIconHeart from './svg/icons/large/SvgIconHeart';
import SvgIconHome from './svg/icons/large/SvgIconHome';
import SvgIconIncognito from './svg/icons/large/SvgIconIncognito';
import SvgIconLeft from './svg/icons/large/SvgIconLeft';
import SvgIconRight from './svg/icons/large/SvgIconRight';
import SvgIconSearch from './svg/icons/large/SvgIconSearch';
import SvgIconStory from './svg/icons/large/SvgIconStory';
// -- icons small
import SvgIconSmallAdd from './svg/icons/small/SvgIconSmallAdd';
import SvgIconSmallAttach from './svg/icons/small/SvgIconSmallAttach';
import SvgIconSmallBookmark from './svg/icons/small/SvgIconSmallBookmark';
import SvgIconSmallClose from './svg/icons/small/SvgIconSmallClose';
import SvgIconSmallDown from './svg/icons/small/SvgIconSmallDown';
import SvgIconSmallEdit from './svg/icons/small/SvgIconSmallEdit';
import SvgIconSmallHeart from './svg/icons/small/SvgIconSmallHeart';
import SvgIconSmallLeft from './svg/icons/small/SvgIconSmallLeft';
import SvgIconSmallMessage from './svg/icons/small/SvgIconSmallMessage';
import SvgIconSmallRight from './svg/icons/small/SvgIconSmallRight';
import SvgIconSmallShare from './svg/icons/small/SvgIconSmallShare';
import SvgIconSmallUp from './svg/icons/small/SvgIconSmallUp';

export {
  // util
  AssetStyles,
  VIBRATE_DUR,
  // types
  ModeType,
  UtilityType,
  ColorType,
  // core components
  CoreAvatar,
  CoreBadge,
  CoreBullet,
  CoreButton,
  CoreNavBar,
  CorePullBar,
  CoreSegmentedControl,
  CoreText,
  // base components
  Badge,
  Border,
  Bullet,
  BulletPager,
  Button,
  ButtonLargeHeight,
  ButtonNormalHeight,
  ButtonSmallHeight,
  Gallery,
  GalleryItemType,
  Container,
  MenuItem,
  MenuItemAccount,
  MenuItemHeight,
  MenuItemThumbnail,
  Navigation,
  NavigationIcon,
  NavBarUser,
  NavBarUserPostEdit,
  NavBarUserStoryIncident,
  Panel,
  PanelProps,
  PlaceholderTextColor,
  Post,
  PostContent,
  PostContentHeader,
  PostContentHeading,
  PostsEditSlider,
  PostsEditItemType,
  PullBar,
  PullBarHeight,
  TabbarBackground,
  TabbarCircleButton,
  Text,
  TextProps,
  Thumbnail,
  ThumbnailDimension,
  Search,
  // Colors
  Color,
  // components
  // svg graphics
  SvgTabbarBackground,
  SvgTabbarBackgroundWidth,
  SvgTabbarBackgroundHeight,
  SvgLogoGrapple,
  SvgBlob,
  SvgBlobMirrored,
  SvgRulerRightArrow,
  // icons large
  SvgIconAccount,
  SvgIconBookmark,
  SvgIconChat,
  SvgIconDown,
  SvgIconEdit,
  SvgIconFlash,
  SvgIconFlashAuto,
  SvgIconFlashOff,
  SvgIconHeart,
  SvgIconHome,
  SvgIconIncognito,
  SvgIconLeft,
  SvgIconRight,
  SvgIconSearch,
  SvgIconStory,
  // icons small
  SvgIconSmallAdd,
  SvgIconSmallAttach,
  SvgIconSmallBookmark,
  SvgIconSmallClose,
  SvgIconSmallDown,
  SvgIconSmallEdit,
  SvgIconSmallHeart,
  SvgIconSmallLeft,
  SvgIconSmallMessage,
  SvgIconSmallRight,
  SvgIconSmallShare,
  SvgIconSmallUp,
};
