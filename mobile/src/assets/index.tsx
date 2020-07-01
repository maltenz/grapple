import { AssetStyles } from './styles';
import { ModeType, UtilityType, ColorType } from '../types';

import { Color } from './colors';
import { VIBRATE_DUR } from './system';

/**
 * helpers
 */
import { CreateId, UploadImage } from './helpers';

/**
 * core components
 */
import {
  CoreAvatar,
  CoreBadge,
  CoreBullet,
  CoreButton,
  CoreNavBar,
  CorePullBar,
  CoreText,
} from './components/core';

/**
 * base components
 */
import Award from './components/base/Award';
import Badge from './components/base/Badge';
import Border from './components/base/Border';
import Bullet from './components/base/Bullet';
import BulletPager from './components/base/BulletPager';
import Button, {
  ButtonLargeHeight,
  ButtonNormalHeight,
  ButtonSmallHeight,
} from './components/base/Button';
import Comment, { CommentUser, CommentContainer } from './components/base/Comment';
import CommentLoader from './components/base/CommentLoader';
import Container from './components/base/Container';
import Excerpt from './components/base/Excerpt';
import MenuItem, { MenuItemHeight } from './components/base/MenuItem';
import MenuItemAccount from './components/base/MenuItemAccount';
import MenuItemThumbnail from './components/base/MenuItemThumbnail';
import Navigation, { NavigationIcon } from './components/base/Navigation';
import Overlay, { OverlayHeader, OverlayPanel, OverlayItem } from './components/base/Overlay';
import NavBarUser from './components/base/NavBarUser';
import NavBarUserPostEdit from './components/base/NavBarUserPostEdit';
import NavBarUserStoryIncident from './components/base/NavBarUserStoryIncident';
import Panel, { PanelProps } from './components/base/Panel';
import Post from './components/base/Post';
import PostContent from './components/base/PostContent';
import PostContentHeader from './components/base/PostContentHeader';
import PostContentHeading from './components/base/PostContentHeading';
import PostsEditSlider, { PostsEditItemType } from './components/base/PostsEditSlider';
import PullBar, { PullBarHeight } from './components/base/PullBar';
import SegmentedController from './components/base/SegmentedControl';
import TabbarBackground from './components/base/TabbarBackground';
import TabbarCircleButton from './components/base/TabbarCircleButton';
import Tag from './components/base/Tag';
import Text, { TextProps, PlaceholderTextColor } from './components/base/Text';
import Thumbnail, { ThumbnailDimension } from './components/base/Thumbnail';
import Search from './components/base/Search';

/**
 * Svg components
 */
import SvgTabbarBackground, {
  SvgTabbarBackgroundWidth,
  SvgTabbarBackgroundHeight,
} from './svg/SvgTabbarBackground';

// -- graphis
import SvgAnonymousProfile from './svg/SvgAnonymousProfile';
import SvgLogoGrapple from './svg/SvgGrappleLogo';
import SvgBlob from './svg/SvgBlob';
import SvgBlobMirrored from './svg/SvgBlobMirrored';
import SvgRulerRightArrow from './svg/SvgRulerRightArrow';
import SvgWiggleFill from './svg/SvgWiggleFill';
// -- icons large
import SvgIconAccount from './svg/icons/large/SvgIconAccount';
import SvgIconBookmark from './svg/icons/large/SvgIconBookmark';
import SvgIconCameraFlip from './svg/icons/large/SvgIconCameraFlip';
import SvgIconChat from './svg/icons/large/SvgIconChat';
import SvgIconClose from './svg/icons/large/SvgIconClose';
import SvgIconDown from './svg/icons/large/SvgIconDown';
import SvgIconEdit from './svg/icons/large/SvgIconEdit';
import SvgIconFlash from './svg/icons/large/SvgIconFlash';
import SvgIconFlashAuto from './svg/icons/large/SvgIconFlashAuto';
import SvgIconFlashOff from './svg/icons/large/SvgIconFlashOff';
import SvgIconHeart from './svg/icons/large/SvgIconHeart';
import SvgIconHome from './svg/icons/large/SvgIconHome';
import SvgIconImage from './svg/icons/large/SvgIconImage';
import SvgIconIncognito from './svg/icons/large/SvgIconIncognito';
import SvgIconLeft from './svg/icons/large/SvgIconLeft';
import SvgIconMenu from './svg/icons/large/SvgIconMenu';
import SvgIconRight from './svg/icons/large/SvgIconRight';
import SvgIconSearch from './svg/icons/large/SvgIconSearch';
import SvgIconStory from './svg/icons/large/SvgIconStory';
import SvgIconVideo from './svg/icons/large/SvgIconVideo';
import SvgIconVideoOff from './svg/icons/large/SvgIconVideoOff';
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
  // helpers
  CreateId,
  UploadImage,
  // util
  AssetStyles,
  Color,
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
  CoreText,
  // base components
  Award,
  Badge,
  Border,
  Bullet,
  BulletPager,
  Button,
  ButtonLargeHeight,
  ButtonNormalHeight,
  ButtonSmallHeight,
  Comment,
  CommentUser,
  CommentContainer,
  CommentLoader,
  Container,
  Excerpt,
  MenuItem,
  MenuItemAccount,
  MenuItemHeight,
  MenuItemThumbnail,
  Navigation,
  NavigationIcon,
  NavBarUser,
  NavBarUserPostEdit,
  NavBarUserStoryIncident,
  Overlay,
  OverlayHeader,
  OverlayPanel,
  OverlayItem,
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
  Tag,
  Text,
  TextProps,
  Thumbnail,
  ThumbnailDimension,
  SegmentedController,
  Search,
  // components
  // svg graphics
  SvgTabbarBackground,
  SvgTabbarBackgroundWidth,
  SvgTabbarBackgroundHeight,
  SvgAnonymousProfile,
  SvgLogoGrapple,
  SvgBlob,
  SvgBlobMirrored,
  SvgRulerRightArrow,
  SvgWiggleFill,
  // icons large
  SvgIconAccount,
  SvgIconBookmark,
  SvgIconCameraFlip,
  SvgIconChat,
  SvgIconClose,
  SvgIconDown,
  SvgIconEdit,
  SvgIconFlash,
  SvgIconFlashAuto,
  SvgIconFlashOff,
  SvgIconHeart,
  SvgIconHome,
  SvgIconImage,
  SvgIconIncognito,
  SvgIconLeft,
  SvgIconMenu,
  SvgIconRight,
  SvgIconSearch,
  SvgIconStory,
  SvgIconVideo,
  SvgIconVideoOff,
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
